import { Box, Stack } from "@mui/material";
import React from "react";

const Comment = ({data=[]}) => {
  return (
    <Box
      bgcolor="#f3f3f3"
      border={"1px solid #00000030"}
      mt={1}
      minHeight={65}
      boxSizing={"border-box"}
      borderRadius={1}
      p={1.5}
    >
      <Stack
        className="regular font-300"
        mb={1}
        direction="row"
        justifyContent={"space-between"}
      >
        <p style={{ opacity: "80%" }}>{data.name}</p>
        <p style={{ opacity: "80%" }}>{data.date}</p>
      </Stack>
      <p className="regular font-400">{data.comment}</p>
    </Box>
  );
};

export default Comment;
