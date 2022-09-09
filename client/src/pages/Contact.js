import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Slide,
  CssBaseline,
} from "@mui/material";
import * as React from "react";

export default function Contact() {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        component="body"
        sx={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100vh",
          bgcolor: "primary.main",
        }}
        className="contact-form"
      >
        <Slide
          in={checked}
          direction="up"
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 500 } : {})}
        >
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h3">
                  Contact Us
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  Fill out the form and our team will get back to you within 24
                  hours.
                </Typography>
                <form>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        placeholder="Enter first name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        placeholder="Enter phone number"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        placeholder="Type your message here"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Slide>
      </Box>
    </React.Fragment>
  );
}
