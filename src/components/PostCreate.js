import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const PostCreate = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const boardId = location.state.boardId; // state에서 boardId를 가져 옴
  const boardId = useSelector((state) => state.boardState.boardId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      board_id: boardId, // 게시판 ID 포함: 서버가 기대하는 필드 명 확인
      user_name: userName,
      password: password,
      email: email,
      title: title,
      content: content,
    };

    try {
      const response = await ApiService.createPost(postData);
      console.log("Post created successfully: ", response.data);
      // navigate(`/board/${boardId}`); // 작성 완료 후 해당 게시판 게시글 목록 페이지로 이동
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post : ", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        게시글 작성
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="작성자 이름"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="이메일"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="제목"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="내용"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" type="submit">
            작성하기
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PostCreate;
