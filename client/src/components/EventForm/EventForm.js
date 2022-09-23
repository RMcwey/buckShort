import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_EVENT } from "../../utils/mutations";
// import { QUERY_EVENTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Box, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextEditor from "../TextEditor/TextEditor";

export default function EventForm() {
  const [content, setContent] = useState("");
  //   const [addEvent, { error }] = useMutation(ADD_EVENT, {
  //     update(cache, { data: { addEvent } }) {
  //       try {
  //         const { allEvents } = cache.readQuery({ query: QUERY_EVENTS });

  //         cache.writeQuery({
  //           query: QUERY_EVENTS,
  //           data: { allEvents: [addEvent, ...allEvents] },
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     },
  //   });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   await addEvent({
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
          <Typography variant="h4">Post an Event</Typography>
          <Box
            component="form"
            className="eventForm"
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
