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

export const QUERY_ALL_POSTS = gql`
  query getAllPosts {
    allPosts {
      _id
      title
      content
      author
      createdAt
    }
  }
`;

export const QUERY_SINGLE_COMMENT = gql`
  query getSingleComment($commentId: ID!) {
    comment(commentId: $commentId) {
      _id
      content
      author
      createdAt
    }
  }
`;

export const QUERY_ALL_COMMENTS = gql`
  query getAllComments {
    allComments {
      _id
      content
      author
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REVIEW = gql`
  query getSingleReview($reviewId: ID!) {
    review(reviewId: $reviewId) {
      _id
      content
      author
      createdAt
      revComments {
        _id
        content
        author
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_REVIEWS = gql`
  query getAllReveiws {
    allReviews {
      _id
      content
      author
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REVCOMMENT = gql`
  query getSingleRevComment($revCommentId: ID!) {
    revComment(revCommentId: $revCommentId) {
      _id
      content
      author
      createdAt
    }
  }
`;

export const QUERY_ALL_REVCOMMENTS = gql`
  query getAllRevComments {
    allRevComments {
      _id
      content
      author
      createdAt
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId) {
      _id
      title
      content
      createdAt
    }
  }
`;

export const QUERY_ALL_EVENTS = gql`
  query getAllEvents {
    allEvents {
      _id
      title
      content
      createdAt
    }
  }
`;