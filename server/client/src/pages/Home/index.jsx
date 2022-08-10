import { Box } from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const createBoard = () => {};
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={createBoard}
        loading={loading}
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;
