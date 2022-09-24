import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

const EventList = ({ allEvents, title, showTitle = true }) => {
  if (!allEvents.length) {
    return <h3>Your reviews will display here.</h3>;
  }
  console.log(allEvents);
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {allEvents &&
        allEvents.map((event) => (
          <div key={event._id}>
            <Card
              sx={{
                p: 2,
                mt: 3,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <CardContent>
                {" "}
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "secondary.extraLight",
                    borderRadius: "3px",
                  }}
                >
                  <Typography sx={{ color: "secondary.main" }}>
                    Posted on {event.createdAt}
                  </Typography>
                  <div>{parse(event.content)}</div>
                </Box>
                <Button variant="contained">
                  <Link
                    underline="none"
                    href={`/Events/${event._id}`}
                    sx={{ color: "black" }}
                  >
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default EventList;
