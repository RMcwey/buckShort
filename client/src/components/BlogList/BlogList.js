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

const BlogList = ({ allPosts, title, showTitle = true }) => {
  if (!allPosts.length) {
    return <h3>Your blog posts will display here.</h3>;
  }
  console.log(allPosts);
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {allPosts &&
        allPosts.map((post) => (
          <div key={post._id}>
            <Card
              sx={{
                p: 2,
                mt: 3,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <CardContent>
                {" "}
                <Typography variant="h4">
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "secondary.extraLight",
                      borderRadius: "3px",
                    }}
                  >
                    <Link underline="hover" href={`/Blog/${post._id}`}>
                      {post.title} <br />
                    </Link>
                  </Box>
                </Typography>
                <div>{parse(post.content)}</div>
                <Typography sx={{ color: "secondary.main" }}>
                  Posted by {post.author}
                </Typography>
                <Button variant="contained">
                  <Link
                    underline="none"
                    href={`/Blog/${post._id}`}
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

export default BlogList;
