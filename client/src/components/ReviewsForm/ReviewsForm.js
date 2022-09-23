import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_REVIEW } from "../../utils/mutations";
// import { QUERY_REVIEWS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Box, Button, Typography, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextEditor from "../TextEditor/TextEditor";

export default function ReviewsForm() {
  const [content, setContent] = useState("");
  //   const [addReview, { error }] = useMutation(ADD_REVIEW, {
  //     update(cache, { data: { addReview } }) {
  //       try {
  //         const { allPosts } = cache.readQuery({ query: QUERY_POSTS });

  //         cache.writeQuery({
  //           query: QUERY_POSTS,
  //           data: { allPosts: [addReview, ...allPosts] },
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     },
  //   });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   await addReview({
    //     variables: {
    //       content,
    //       author: Auth.getProfile().data.name,
    //     },
    //   });

    //   setContent("");
    // } catch (err) {
    //   console.error(err);
    // }
  };
  return (
    <>
      {Auth.loggedIn() ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Post a Review</Typography>
          <Box
            component="form"
            className="reviewForm"
            onSubmit={handleFormSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextEditor setContent={setContent} />
            <Button
              sx={{ mt: 1 }}
              type="submit"
              variant="contained"
              onClick={() => {
                console.log(content);
              }}
            >
              <SendIcon color="primary.main" />
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
