import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
  ListItemButton,
} from "@mui/material";
import assets from "../../../assets";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate, useParams, Link } from "react-router-dom";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FavouriteList from "../FavouriteList";
import { useEffect } from "react";
import boardsApi from "../../../api/boardsApi";
import { setBoards } from "../../../redux/features/boardsSlice";
import { toast } from "react-toastify";
const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarWidth = 250;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.boards.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  const [w, setW] = useState(window.innerWidth);

  // get all boards
  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardsApi.getAll();
        dispatch(setBoards(res));
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data.message
        );
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
    if (boards.length === 0) {
      navigate(`/boards`);
    }

    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  //logout user
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    // remove the item
    const [removed] = newList.splice(source.index, 1);
    // add the item
    newList.splice(destination.index, 0, removed);
    // set the index no again
    const activeItem = newList.findIndex((e) => e._id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      // update the board postion when refresh the page it will be fixed after drag
      await boardsApi.updatePositoin({
        boards: newList,
      });
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
    }
  };

  const addBoard = async () => {
    try {
      const res = await boardsApi.create();

      const newList = [res, ...boards];

      dispatch(setBoards(newList));

      toast.success("Created");

      navigate(`/boards/${res._id}`);
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer
      className="someClass"
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        minHeight: "100vh",
        overflowY: "scroll",
        "& > div": {
          borderRight: "none",
        },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100%",
          minHeight: "100vh",
          overflowY: "scroll",
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
              {user.username} {w}
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
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        {/* draggleable component */}
        {/* wrap the whole content where want to drag and drop div */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* which div want to dropable wrap this div using dropable he taks some id and key must be provided */}
          <Droppable
            key={`list-board-droppable-key`}
            droppableId={`list-board-droppable`}
          >
            {/* here call the anonymus function built in react-dnd provided */}

            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  /* dragable component */
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    /* index must need to provide check the index and match the status on item */
                    index={index}
                  >
                    {/* here also get the function */}
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item._id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer !important",
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
