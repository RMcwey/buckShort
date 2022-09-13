import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import MessageIcon from "@mui/icons-material/Message";
import { ADD_COMMENT } from "../../utils/mutations";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: {
          postId,
          content,
          author,
        },
      });

      setContent("");
      setAuthor("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "content" && value.length <= 280) {
      setContent(value);
      setCharacterCount(value.length);
    }
    if (name === "author") {
      setAuthor(value);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant={"h5"} sx={{ pt: 2 }}>
        Care to comment?
      </Typography>

      <Typography sx={{ pt: 2 }} variant="span">
        Character Count: {characterCount}/280
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">This field is required</Alert>
          </Stack>
        )}
      </Typography>
      <Box
        component="form"
        className="comment-form"
        onSubmit={handleFormSubmit}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          type="text"
          name="content"
          placeholder="Add your comment"
          className="form-input"
          value={content}
          onChange={handleChange}
        ></TextField>
        <TextField
          type="text"
          name="author"
          placeholder="Add your name"
          className="form-input"
          value={author}
          onChange={handleChange}
        ></TextField>
        <Button
          sx={{ mt: 1 }}
          type="submit"
          variant="contained"
          size="medium"
          onClick={() => {
            console.log(content);
            console.log(author);
          }}
        >
          <MessageIcon color="#6B3567" size="lg" />
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
