import React, { useEffect, useState } from "react";
import Background from "../assets/images/background.png";
import Logo from "../assets/images/Logos/a-buck-3-removebg.png";
import { Link as Scroll } from "react-scroll";
import { styled } from "@mui/system";
import {
  CssBaseline,
  Box,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GlitchFx from "react-glitch-fx/lib/GlitchFx";
import Alert from "@mui/material/Alert";
import MuiImageList from "../components/MuiImageList/MuiImageList";
// import Auth from "../utils/auth";
import richard from "../assets/images/photos/richard.jpg";

const BackgroundStyled = styled("div")({
  minHeight: "100%",
  backgroundImage: `url(${Background})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  overflow: "hidden",
  backgroundAttachment: "fixed",
});

const AlignedDiv = styled("div")({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "100vh",
});

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <BackgroundStyled>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100vh",
        }}
      >
        <AlignedDiv className="alignedDiv">
          <Collapse
            className="collapse"
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedSize={50}
            // sx={{ mx: "auto", display: "flex", justifyContent: "center" }}
          >
            {/* {Auth.loggedIn() ? (
              <Collapse in={open} sx={{ mt: 4 }}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  You are successfully logged in.
                </Alert>
              </Collapse>
            ) : null} */}
            <GlitchFx>
              <Box
                component={"img"}
                className="logo"
                src={Logo}
                sx={{
                  height: "100%",
                  maxWidth: "100%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </GlitchFx>
          </Collapse>
          <Collapse
            className="collapse"
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedSize={50}
          >
            <Scroll to="about" smooth={true}>
              <IconButton>
                <ExpandMoreIcon
                  sx={{
                    fontSize: "8rem",
                    color: "primary.contrastText",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                />
              </IconButton>
              <Typography sx={{ color: "primary.contrastText", fontSize: 26 }}>
                About Us
              </Typography>
            </Scroll>
          </Collapse>
        </AlignedDiv>
      </Box>
      <Box
        id="about"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100vh",
          margin: "2em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "2em",
          }}
        >
          <Typography
            sx={{
              maxWidth: "45%",
              color: "primary.contrastText",
              fontSize: 26,
            }}
          >
            <span style={{ fontSize: 32, fontWeight: "bolder" }}>
              A Buck Short Productions
            </span>{" "}
            is a film production company based out of Hampton, Georgia. Writer
            and director Richard Tanner began A Buck Short after an unfortunate
            run-in with a cold-hearted bitch. Though the journey was long and
            painful, they emerged from the toxic waste as film makers, a strong
            team, and kick-ass kung-fu masters!
          </Typography>
          <img
            src={richard}
            style={{ borderRadius: "3px", boxShadow: "2px 2px 8px #FFF" }}
            alt="Richard Tanner at The Black Cat Picture Show"
          />
        </Box>
        <MuiImageList />
      </Box>
    </BackgroundStyled>
  );
}
