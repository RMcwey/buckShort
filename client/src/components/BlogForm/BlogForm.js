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
import TextEditor from "../TextEditor/TextEditor";

export default function BlogForm(props) {
  const [title, setTitle] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [content, setContent] = useState("");
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { allPosts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { allPosts: [addPost, ...allPosts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: {
          title,
          content,
          author: Auth.getProfile().data.name,
        },
      });

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "content" && value.length <= 1000) {
      // setContent(value);
      setCharacterCount(value.length);
    } else if (name === "title") {
      setTitle(value);
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
                name="title"
                placeholder="Blog Title"
                className="form-input"
                value={title}
                onChange={handleChange}
              ></TextField>
              Character Count: {characterCount}/1000
            </Typography>
            <TextEditor setContent={setContent} />
            {/* <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              name="content"
              placeholder="Enter your blog post..."
              className="form-input"
              value={content}
              onChange={handleChange}
            ></TextareaAutosize> */}
            <Button
              sx={{ mt: 1 }}
              type="submit"
              variant="contained"
              onClick={() => {
                console.log(content);
                console.log(title);
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
