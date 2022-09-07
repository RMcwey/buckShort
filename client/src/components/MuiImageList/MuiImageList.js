import React from "react";
import pictureArray from "./pictureArray";
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
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack spacing={4}>
      <Box sx={{ width: "90vw", height: "100vh", overFlowY: "hidden" }}>
        <ImageList variant="masonry" cols={matches ? 4 : 2} gap={8}>
          {pictureArray.map((item) => (
            <ImageListItem key={item.id}>
              <img
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
