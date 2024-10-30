import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../service/ApiService";

const BoardContext = createContext();

export const useBoardContext = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBoards = async () => {
    try {
      const response = await ApiService.fetchBoards();
      setBoards(response.data);
    } catch (err) {
      console.error("Error fetching boards: ", err);
      setError("게시판을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (boardData) => {
    try {
      const response = await ApiService.createBoard(boardData);
      console.log("게시판 생성 성공: ", response.data);
      await loadBoards(); // 게시판 목록 새로고침
      return response.data;
    } catch (err) {
      console.error("게시판 생성 중 오류 발생: ", err);
      throw new Error("게시판 생성 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, loading, error, createBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
