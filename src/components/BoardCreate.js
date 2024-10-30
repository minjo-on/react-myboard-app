import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const BoardCreate = () => {
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await ApiService.createBoard({ board_name: boardName });
      navigate("/boards"); // 게시판 생성 후 게시판 목록으로 이동
    } catch (error) {
      console.error("Error creating board: ", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        새로운 게시판 만들기
      </Typography>
      <TextField
        label="게시판 이름"
        variant="outlined"
        fullWidth
        margin="normal"
        value={boardName}
        onChange={(e) => {
          setBoardName(e.target.value);
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        게시판 생성
      </Button>
    </Container>
  );
};

export default BoardCreate;
