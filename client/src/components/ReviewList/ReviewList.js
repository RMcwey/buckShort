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

const ReviewList = ({ allReviews }) => {
  if (!allReviews.length) {
    return <h3>Your reviews will display here.</h3>;
  }
  console.log(allReviews);
  return (
    <div>
      {allReviews &&
        allReviews.map((review) => (
          <div key={review._id}>
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
                  <div>{parse(review.content)}</div>
                </Box>
                <Typography sx={{ color: "secondary.main" }}>
                  reviewed by {review.author}
                </Typography>
                <Button variant="contained">
                  <Link
                    underline="none"
                    href={`/Reviews/${review._id}`}
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

export default ReviewList;
