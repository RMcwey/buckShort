import { gql } from "@apollo/client";

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

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      _id
      title
      content
      author
      comments {
        _id
        content
        author
      }
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
