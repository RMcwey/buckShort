const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    posts: [Post]!
    reviews: [Review]!
  }

  type Post {
    _id: ID
    title: String
    content: String
    author: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    content: String
    author: String
    createdAt: String
  }

  type Review {
    _id: ID
    content: String
    author: String
    createdAt: String
    revComments: [RevComment]!
  }

  type RevComment {
    _id: ID
    content: String
    author: String
    createdAt: String
  }

  type Event {
    _id: ID
    title: String
    content: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(userId: ID!): User
    allUsers: [User]
    me: User
    post(postId: ID!): Post
    allPosts: [Post]
    comment(commentId: ID!): Comment
    allComments: [Comment]
    review(reviewId: ID!): Review
    allReviews: [Review]
    revComment(revCommentId: ID!): RevComment
    allRevComments: [RevComment]
    event(eventId: ID!): Event
    allEvents: [Event]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, name: String, email: String, password: String): User
    removeUser(userId: ID!, postId: ID!): User
    addPost(title: String, content: String): Post
    updatePost(_id: ID!, title: String, content: String): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, content: String, author: String): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addReview(content: String): Review
    updateReview(_id: ID!, content: String): Review
    removeReview(reviewId: ID!): Review
    addRevComment(reviewId: ID!, content: String, author: String): Review
    removeRevComment(reviewId: ID!, revCommentId: ID!): Review
    addEvent(title: String, content: String): Event
    updateEvent(_id: ID!, title: String, content: String): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
