import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetails, updatePost } from "../store/slices/postSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";

const PostEdit = () => {
  const { postId } = useParams();
  const location = useLocation(); // 비밀번호 상태 가져오기
  const password = location.state.password;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태에서 데이터 가져오기
  const post = useSelector((state) => state.postState.post);
  const boardId = useSelector((state) => state.boardState.boardId);

  // 로컬 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // 디버깅용 로그
    console.log("Received postId:", postId);

    if (postId) {
      dispatch(fetchPostDetails({ postId, password }));
    } else {
      console.error("postId is undefined");
    }
  }, [dispatch, postId, password]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setUserName(post.user_name || "");
      setEmail(post.email || "");
    }
  }, [post]);

  const handleEditSubmit = () => {
    const postData = {
      board_id: boardId,
      user_name: userName,
      password: password,
      email: email,
      title: title,
      content: content,
    };

    // 디버깅용 로그
    console.log("Submitting postData:", postData);

    if (postId) {
      dispatch(updatePost({ postId, postData })).then(() => {
        navigate("/posts");
      });
    } else {
      console.error("Cannot submit update: postId is undefined");
    }
  };

  if (!post) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          게시글을 불러오는 중입니다...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          게시글 수정
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="작성자 이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleEditSubmit}
              >
                수정하기
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostEdit;
