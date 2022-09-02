const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId })
        .populate("posts")
        .populate({
          path: "posts",
          populate: "author",
        })
        .populate("comments")
        .populate({
          path: "comment",
          ref: "author",
        });
    },
    allUsers: async () => {
      return await User.find({})
        .populate("posts")
        .populate("comments")
        .populate({
          path: "posts",
          populate: "author",
        })
        .populate({
          path: "comments",
          populate: "author",
        });
    },
    post: async () => {
      return await Post.findOne({ _id: postId }).populate("comments").populate({
        path: "comment",
        populate: "originalPost",
      });
    },
    allPosts: async () => {
      return await Post.find({}).populate("comments").populate({
        path: "comment",
        populate: "originalPost",
      });
    },
    // postsByAuthor: async () => {
    //   return await Post.findById({author: User._id});
    // },
    comment: async () => {
      return await Comment.findOne({ _id: commentId })
        .populate("originalPost")
        .populate({
          path: "originalPost",
          populate: "comments",
        });
    },
    allComments: async () => {
      return await Comment.findOne({}).populate("originalPost").populate({
        path: "originalPost",
        populate: "comments",
      });
    },
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: args._id },
          {
            $set: {
              name: args.name,
              email: args.email,
              password: args.password,
              screenName: args.screenName,
            },
          },
          { returnDocument: "after" }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
