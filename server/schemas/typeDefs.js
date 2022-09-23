const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    posts: [Post]
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
    author: String
    content: String
    createdAt: String
    comments: [Comment]!
  }

  type Event {
    _id:ID
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
    post(postId: ID!): Post
    allPosts: [Post]
    comment(commentId: ID!): Comment
    allComments: [Comment]
    review(reviewId: ID!): Review
    allReviews: [Review]
    event(eventId: ID!): Event
    allEvents: [Event]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, name: String, email: String, password: String): User
    removeUser(userId: ID!, postId: ID!): User
    addPost(title: String, authorId: ID, content: String): Post
    updatePost(_id: ID!, author: String, content: String): Post
    removePost(postId: ID!): Post
    addComment(commentId: ID!, content: String, author: String): Post
    updateComment(_id: ID!, author: String, content: String): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addComment(postId: ID!, content: String, author: String): Post
    updateComment(_id: ID!, author: String, content: String): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
