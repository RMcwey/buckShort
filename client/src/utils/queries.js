import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getPosts {
    allPosts {
      _id
      title
      content
      author
    }
  }
`;
