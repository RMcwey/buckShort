import React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_EVENTS } from "../utils/queries";
import Auth from "../utils/auth";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import EventForm from "../components/EventForm/EventForm";
// import EventList from "../components/EventList/EventList";

const Events = () => {
  // const { loading, data } = useQuery(QUERY_EVENTS);
  // const allEvents = data?.allEvents || [];
  return (
    <div className="event-card">
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
              <EventForm
                sx={{ flexDirection: "column", justifyContent: "center" }}
              />
            </CardContent>
          </Card>

          {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <Box>
              <EventList allEvents={allEvents} title="Buck Short Events" />
            </Box>
          )} */}
        </Container>
      ) : (
        <Box>
          {/* <EventList allEvents={allEvents} title="Buck Short Events" /> */}
        </Box>
      )}
    </div>
  );
};

export default Events;
