import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";

const Kanban = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button>Add Section</Button>
        <Typography variant="body2" fontWeight="700">
          0 Sections
        </Typography>
      </Box>

      <Divider sx={{ margin: "10px 0" }} />
    </>
  );
};

export default Kanban;
