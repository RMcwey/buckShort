import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import {
  Box,
  Button,
  Typography,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function BlogForm() {
  const [blogPostText, setBlogPostText] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          blogPostText,
          postAuthor: Auth.getProfile().data.firstName,
        },
      });

      setBlogPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "blogPostText" && value.length <= 1000) {
      setBlogPostText(value);
      setCharacterCount(value.length);
    }
  };
  return (
    <>
      {Auth.loggedIn() ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Create a Blog Post</Typography>
          <Box
            component="form"
            className="blogPostForm"
            onSubmit={handleFormSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component={"span"}
              className={`m-0 ${
                characterCount === 1000 || error ? "text-danger" : ""
              }`}
            >
              <TextField
                type="text"
                name="blogTitle"
                placeholder="Blog Title"
                className="form-input"
                value={blogTitle}
                onChange={handleChange}
              ></TextField>
              Character Count: {characterCount}/1000
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              name="blogPostText"
              placeholder="Enter your blog post..."
              className="form-input"
              value={blogPostText}
              onChange={handleChange}
            ></TextareaAutosize>
            <Button sx={{ mt: 1 }} type="submit" variant="contained">
              <SendIcon color="primary.main" />
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
