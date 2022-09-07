import React from "react";
import pictureArray from "./pictureArray";
import { Stack, ImageList, ImageListItem, Box } from "@mui/material";

export default function MuiImageList() {
  return (
    <Stack spacing={4}>
      <Box sx={{ width: "90vw", height: "100vh", overFlowY: "hidden" }}>
        <ImageList variant="masonry" cols={4} gap={8}>
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
