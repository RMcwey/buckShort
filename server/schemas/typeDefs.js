const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    post: [Post]
    comment: [Comment]
  }  

  type Post {
    _id: ID
    title: String
    author: User
    content: String
    users: [User]
  }

  type Comment {
    _id: ID
    title: String
    author: User
    content: String
    originalPost: [Post]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user (userId: ID!): User
    allUsers: [User]
    me: User
    post (postId: ID!): Post
    allPosts: [Post]
    myPosts: [Post]
    postsByAuthor (authorId: ID!): [Post]
    comment (commentId: ID!): Comment
    allComments: [Comment]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, name: String, email: String, password: String): User
    removeUser: User
    addPost(title: String, authorId: ID, content: String): Post
    updatePost(_id: ID!, name: String, content: String): Post
    removePost: Post
    addComment(title: String, authorId: ID, content: String): Comment
    updateComment(_id: ID!, name: String, content: String): Comment
    removeComment: Comment
  }
`;

module.exports = typeDefs;


// createMatchup(tech1: String!, tech2: String!): Matchup
// createVote(_id: String!, techNum: Int!): Matchup