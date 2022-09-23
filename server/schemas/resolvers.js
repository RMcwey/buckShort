const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment, Review, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findOne({ name: author }).populate("posts");
    },
    allUsers: async () => {
      return await User.find().populate("posts");
    },
    post: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId }).populate("comments");
    },
    allPosts: async () => {
      return await Post.find().populate("comments");
    },
    comment: async (parent, { commentId }) => {
      return await Comment.findOne({ _id: commentId });
    },
    allComments: async () => {
      return await Comment.find();
    },
    review: async (parent, { reviewId }) => {
      return await Review.findOne({ _id: reviewId });
    },
    allReviews: async () => {
      return await Review.find();
    },
    event: async (parent, { eventId }) => {
      return await Event.findOne({ _id: eventId });
    },
    allEvents: async () => { 
      return await Event.find();
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
            },
          },
          { returnDocument: "after" }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
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
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePost: async (parent, {postId, title, content}, context) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
          {_id: postId},
          {
            $set: {
              title: title,
              content: content,
            },
          },
          {new: true}
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePost: async (parent, { postId, userId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          author: context.user.name,
        });
        await User.findOneAndUpdate(
          { _id: context.user_id },
          { $pull: { posts: post._id } },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, content, author }) => {
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
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                // author: author,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
