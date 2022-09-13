const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate("posts");
    },
    allUsers: async () => {
      return await User.find().populate("posts");
    },
    post: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId });
    },
    allPosts: async (parent, { userId }) => {
      return await Post.find(params).populate("posts");
    },
    //   comment: async (parent, { commentId }) => {
    //     return await Comment.findOne({ _id: commentId })
    //       .populate("originalPost")
    //       .populate({
    //         path: "originalPost",
    //         populate: "comments",
    //       });
    //   },
    //   allComments: async () => {
    //     return await Comment.find({}).populate("originalPost").populate({
    //       path: "originalPost",
    //       populate: "comments",
    //     });
    //   },
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
    addPost: async (parent, { title, content }, context) => {
      if (context.user) {
        const post = await Post.create({
          title,
          content,
          author: context.user.name,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { allPosts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, content }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            comments: { content, author },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
