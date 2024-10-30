import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Board = ({ board }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate(`/posts`, {
        state: { boardName: board.board_name, boardId: board.board_id },
      });
    } catch (error) {
      console.error("error fetching post details: ", error);
    }
  };

  return (
    <ListItem key={board.board_id} button onClick={handleClick}>
      <ListItemText primary={board.board_name} />
    </ListItem>
  );
};

export default Board;
