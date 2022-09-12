import React from "react";
// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import CommentList from "../components/CommentList";
// import CommentForm from "../components/CommentForm";
import { QUERY_SINGLE_POST } from "../utils/queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <CardContent>
          <Box
            sx={{
              p: 2,
              backgroundColor: "secondary.extraLight",
              borderRadius: "3px",
            }}
          >
            <Typography
              sx={{ mb: 1.5, display: "flex", justifyContent: "center" }}
              color="secondary.main"
              variant="h5"
              component="div"
            >
              {post.title}
            </Typography>
            <Typography>{post.content}</Typography>
          </Box>
          <Typography variant="body2">Posted by {post.author}</Typography>
        </CardContent>
      </Card>
      {/* <Card
        sx={{
          minWidth: 275,
          p: 2,
          m: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent>
          {" "}
          <CommentList comments={post.comments} />
          <CommentForm postId={post._id} sx={{ justifyContent: "center" }} />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default SinglePost;
