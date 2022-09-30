import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
      posts {
        _id
        title
        content
      }
      reviews {
        _id
        content
        author
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    allUsers {
      _id
      name
      email
      posts {
        _id
        title
        content
      }
      reviews {
        _id
        content
        author
        createdAt
      }
    }
  }`

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      posts {
        _id
        title
        content
      }
      reviews {
        _id
        content
        author
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      content
      author
      createdAt
      comments {
        _id
        author
        content
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    allPosts {
      _id
      title
      content
      author
      createdAt
    }
  }
`;
