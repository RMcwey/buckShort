import React from "react";
import { useQuery } from "@apollo/client";
import BlogForm from "../components/BlogForm/BlogForm";
import BlogList from "../components/BlogList/BlogList";
import { QUERY_ALL_POSTS } from "../utils/queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Auth from "../utils/auth";

const Blog = () => {
  const { loading, data } = useQuery(QUERY_ALL_POSTS);
  const allPosts = data?.allPosts || [];
  return (
    <div className="blog-card">
      {Auth.loggedIn() ? (
        <Container>
          <Card
            sx={{
              p: 2,
              m: 3,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <CardContent>
              <BlogForm
                sx={{ flexDirection: "column", justifyContent: "center" }}
              />
            </CardContent>
          </Card>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <Box>
              <BlogList allPosts={allPosts} title="Buck Short Blog" />
            </Box>
          )}
        </Container>
      ) : (
        <Box>
          <BlogList allPosts={allPosts} title="Buck Short Blog" />
        </Box>
      )}
    </div>
  );
};

export default Blog;
