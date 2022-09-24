const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Review, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findOne({ name: author }).populate("posts").populate("reviews");
    },
    allUsers: async () => {
      return await User.find().populate("posts").populate("reviews");
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
      return await Review.findOne({ _id: reviewId }).populate("revComments");
    },
    allReviews: async () => {
      return await Review.find().populate("revComments");
    },
    revComment: async (parent, { revCommentId }) => {
      return await RevComment.findOne({ _id: revCommentId });
    },
    allRevComments: async () => {
      return await RevComment.find();
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
        return await User.findOneAndUpdate(
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
        return await User.findOneAndDelete({ _id: context.user._id });
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
    removePost: async (parent, { postId }, context) => {
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
      return await Post.findOneAndUpdate(
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
    // updateComment: async (parent, {commentId, content, author}) => {
    //   return await Comment.findOneAndUpdate(
    //     {_id: commentId},
    //     {
    //       $set: {
    //         content: content,
    //         author: author,
    //       },
    //     },
    //     {new: true}
    //   );
    // },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
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
    addReview: async (parent, { content }, context) => {
      if (context.user) {
        const review = await Review.create({
          content,
          author: context.user.name,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateReview: async (parent, { reviewId, content }, context) => {
      if (context.user) {
        return await Review.findOneAndUpdate(
          {_id: reviewId},
          {
            $set: {
              content: content,
            },
          },
          {new: true}
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          author: context.user.name,
        });
        await User.findOneAndUpdate(
          { _id: context.user_id },
          { $pull: { reviews: review._id } },
          { new: true }
        );
        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addRevComment: async (parent, { reviewId, content, author }) => {
      return await Review.findOneAndUpdate(
        { _id: reviewId },
        {
          $addToSet: {
            revComments: { content, author },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeRevComment: async (parent, { reviewId, revCommentId }, context) => {
      if (context.user) {
        return await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $pull: {
              revComments: {
                _id: revCommentId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addEvent: async (parent, { title, content }, context) => {
      if (context.user) {
        const review = await Event.create({
          title,
          content,
          // author: context.user.name,
        });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { posts: review._id } }
        // );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateEvent: async (parent, { eventId, title, content }, context) => {
      if (context.user) {
        return await Event.findOneAndUpdate(
          {_id: eventId},
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
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
          // author: context.user.name,
        });
        // await User.findOneAndUpdate(
        //   { _id: context.user_id },
        //   { $pull: { reviews: review._id } },
        //   { new: true }
        // );
        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
