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
import { useNavigate } from "react-router-dom";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { useSelector } from "react-redux";
import FavouriteList from "../FavouriteList";
const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const sidebarWidth = 250;

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
      </List>
    </Drawer>
  );
};

export default Sidebar;
