import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import assets from "../../../assets";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate, useParams } from "react-router-dom";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { useDispatch, useSelector } from "react-redux";
import FavouriteList from "../FavouriteList";
import { useEffect } from "react";
import boardsApi from "../../../api/boardsApi";
import { setBoards } from "../../../redux/features/boardsSlice";
import { useState } from "react";
const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarWidth = 250;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.boards.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  console.log(activeIndex, "activeIndex");

  // get all boards
  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardsApi.getAll();
        dispatch(setBoards(res));
      } catch (error) {
        console.log(error.message);
      }
    };
    getBoards();
  }, [dispatch]);

  // active board

  useEffect(() => {
    // GET THE FIRST ELEMENT FORM THE ARRAY
    const activeItem = boards.findIndex((e) => e._id === boardId);

    // when the board created then cannot redirect to home page redirect to boards/id page if boards have a length
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0]._id}`);
    }

    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  //logout user
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100vh",
        "& > div": {
          borderRight: "none",
        },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="700"
              sx={{
                textTransform: "capitalize",
              }}
            >
              {user.username}
            </Typography>

            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <FavouriteList />
        <Box sx={{ paddingTop: "10px" }} />

        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              Private
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        {/* draggleable component */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
