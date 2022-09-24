import React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_REVIEWS } from "../utils/queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReviewForm from "../components/ReviewForm/ReviewForm";
// import ReviewList from "../components/ReviewList/ReviewList";
import Auth from "../utils/auth";

const Reviews = () => {
  // const { loading, data } = useQuery(QUERY_REVIEWS);
  // const allReviews = data?.allReviews || [];
  return (
    <div className="review-card">
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
              <ReviewForm
                sx={{ flexDirection: "column", justifyContent: "center" }}
              />
            </CardContent>
          </Card>

          {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <Box>
              <ReviewList allReviews={allReviews} title="Buck Short Reviews" />
            </Box>
          )} */}
        </Container>
      ) : (
        <Box>
          {/* <BlogList allReviews={allReviews} title="Buck Short Reviews" /> */}
        </Box>
      )}
    </div>
  );
};

export default Reviews;
