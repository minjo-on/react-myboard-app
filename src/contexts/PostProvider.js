import React, { createContext, useContext, useState, useCallback } from "react";
import ApiService from "../service/ApiService";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async (boardId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchPosts(boardId);
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (postData) => {
    try {
      const response = await ApiService.createPost(postData);
      console.log("게시글 생성 성공: ", response.data);
      return response.data;
    } catch (err) {
      console.error("게시글 생성 중 오류 발생: ", err);
      throw new Error("게시글 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, loading, error, loadPosts, createPost }}
    >
      {children}
    </PostContext.Provider>
  );
};
