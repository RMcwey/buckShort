const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    posts: [Post]
    comments: [Comment]
  }

  type Post {
    _id: ID
    title: String
    author: String
    content: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    author: String
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
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, name: String, email: String, password: String): User
    removeUser: User
    addPost(title: String, authorId: ID, content: String): Post
    updatePost(_id: ID!, name: String, content: String): Post
    removePost: Post
    addComment(postId: ID!, content: String): Post
    updateComment(_id: ID!, name: String, content: String): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
