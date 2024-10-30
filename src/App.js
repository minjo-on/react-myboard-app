import React, { useEffect, useState } from "react";
import BoardList from "./components/BoardList";
import BoardCreate from "./components/BoardCreate";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostCreate from "./components/PostCreate";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PostEdit from "./components/PostEdit";
import { ThemeProvider } from "@emotion/react";
import Cookies from "js-cookie";
import { Button, Box } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("isLoggedIn"));
  const [theme, setTheme] = useState(isLoggedIn ? lightTheme : darkTheme);
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(isLoggedIn ? lightTheme : darkTheme);
  }, [isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme} key={isLoggedIn ? "light" : "dark"}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <h1>익명 질문 게시판</h1>
          {isLoggedIn && (
            <Button variant="outlined" onClick={handleLogout}>
              로그아웃
            </Button>
          )}
        </Box>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/boards" /> : <Navigate to="/login" />
            }
          />

          {/* 게시판 목록 페이지 */}
          <Route path="/boards" element={<BoardList />} />
          {/* 게시판 생성 페이지 */}
          <Route path="/create-board" element={<BoardCreate />} />

          {/* 게시글 목록 페이지 : boardId를 URL 경로에서 전달 */}
          <Route path="/posts" element={<PostList />} />

          {/* 게시글 상세 페이지 (게시글 아이디 전달) */}
          <Route path="/post/:id" element={<PostDetail />} />

          {/* 게시글 작성 페이지 */}
          <Route path="/create-post" element={<PostCreate />} />

          {/* 게시글 수정 페이지 */}
          <Route path="/edit-post/:postId" element={<PostEdit />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
