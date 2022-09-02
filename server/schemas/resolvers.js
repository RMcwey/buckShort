const {AuthenticationError} = require("apollo-server-express");
const {User, Post, Comment} = require("../models");
const {signToken} = require("../utils/auth")

const resolvers = {
  Query: {
    user: async (parent, {userId}) => {
      return User.findOne({_id: userId})
      .populate('posts')
      .populate("comments")
      .populate({
        path: "posts",
        populate: "author"
      });
    },

    allUsers: async () => {
      return await User.find({})
      .populate("posts")
      .populate("comments")
      .populate({
        path: "posts",
        populate: "author"
      })
      .populate({
        path: "comments",
        populate: "author"
      })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({_id: context.user._id})
        .populate("posts")
        .populate({
          path: "post",
          populate: "author"
        })
        .populate("comments")
        .populate({
          path: "comment",
          populate: "author"
        })
      }
      throw new AuthenticationError("You need to be logged in!")
    }
    // matchups: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return Matchup.find(params);
    // },
  },
  Mutation: {

    addUser: async (parent, {name, email, password}) => {
      const user = await User.create({name, email, password});
      const token = signToken(user);
      return {token, user};
    },
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if (!user) {
        throw new AuthenticationError("No user with this email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return {token, user};
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: args._id},
          {
            $set: {
              name: args.name,
              email: args.email,
              password: args.password,
              screenName: args.screenName,
            },
          },
          {returnDocument: "after"}
        );
      }
      throw new AuthenticationError("You need to be logged in")
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({_id: context.user._id});
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // createMatchup: async (parent, args) => {
    //   const matchup = await Matchup.create(args);
    //   return matchup;
    // },
    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
