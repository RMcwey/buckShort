import React from "react";
import { projectArray, pictureArray } from "./pictureArray";
import { useTheme } from "@emotion/react";
import {
  Stack,
  ImageList,
  useMediaQuery,
  ImageListItem,
  Box,
} from "@mui/material";

export default function MuiImageList() {
  //breakpoint at medium screen: grid has 2 columns, then 4 columns
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack spacing={4}>
      <Box sx={{ width: "80vw", margin: "auto" }}>
        <ImageList cols={matchesMd ? 3 : matchesSm ? 1 : 2} gap={30}>
          {projectArray.map((item) => (
            <ImageListItem key={item.id}>
              <img
                style={{ borderRadius: "3px" }}
                src={item.photo}
                srcSet={item.photo}
                alt={item.label}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  );
}
