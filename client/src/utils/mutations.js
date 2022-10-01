import { gql } from "@apollo/client";


export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $name: String, $email: String, $password: String) {
    updateUser(_id: $_id, name: $name, email: $email, password: $password) {
      _id
      name
      email
      password
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      _id
      title
      content
      author
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($_id: ID!, $title: String, $content: String) {
    updateUser(_id: $_id, title: $title, content: $content) {
      _id
      title
      content
      author
      createdAt
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $content: String!, $author: String!) {
    addComment(postId: $postId, content: $content, author: $author) {
      _id
      content
      author
      createdAt
    }
  }
`;
