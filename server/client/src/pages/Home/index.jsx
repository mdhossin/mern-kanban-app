import { Box } from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import boardsApi from "../../api/boardsApi";
import { useDispatch } from "react-redux";
import { setBoards } from "../../redux/features/boardsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createBoard = async () => {
    setLoading(true);

    try {
      const res = await boardsApi.create();

      dispatch(setBoards([res]));
      toast.success("Board created.");
      navigate(`/boards/${res._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
    } finally {
      setLoading(false);
    }
  };
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
