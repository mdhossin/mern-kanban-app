import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import boardsApi from "../../api/boardsApi";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { EmojiPicker, Kanban } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../../redux/features/boardsSlice";

let timer;
const timeout = 500;

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");

  const boards = useSelector((state) => state.boards.value);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardsApi.getOne(boardId);

        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIcon(res.icon);

        console.log(res, "home board");
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data.message
        );
      }
    };
    getBoard();
  }, [boardId]);

  const onIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e._id === boardId);

    temp[index] = {
      ...temp[index],
      icon: newIcon,
    };

    setIcon(newIcon);
    dispatch(setBoards(temp));

    try {
      await boardsApi.update(boardId, { icon: newIcon });
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
    }
  };

  const addFavourite = async () => {
    try {
      const res = await boardsApi.update(boardId, {
        favourite: !isFavourite,
      });
      console.log(res, "favourte");

      setIsFavourite(!isFavourite);
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data.message
      );
    }
  };
  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e._id === boardId);

    temp[index] = {
      ...temp[index],
      title: newTitle,
    };

    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await boardsApi.update(boardId, {
          title: newTitle,
        });
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data.message
        );
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);

    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await boardsApi.update(boardId, {
          description: newDescription,
        });
      } catch (error) {
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data.message
        );
      }
    }, timeout);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignIitems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton variant="outlined" onClick={addFavourite}>
          {isFavourite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>

        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: "10px 50px",
        }}
      >
        <Box>
          {/* emoji picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
            }}
          />
        </Box>

        <Box>
          {/* kanban board */}
          <Kanban data={sections} boardId={boardId} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
