// BoardList.js
import React, { useState } from 'react';
import './BoardList.css';
import AddPost from './Addpost'; // AddPost 컴포넌트 추가

const BoardList = ({ onAddPost }) => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleAddPostClick = (board) => {
    setSelectedBoard(board);
    setShowAddPost(true);
  };

  const handlePostSubmit = (postData) => {
    // 게시글 추가 로직을 수행
    console.log('게시글 추가:', postData);
    // 추가로 필요한 동작 수행

    // 게시글 추가 후 상태 초기화
    setSelectedBoard(null);
    setShowAddPost(false);
  };

  return (
    <div className="board-layout-container">
      <div className="board-list-container">
        <h2>게시판 목록</h2>
        <ul>
          <li onClick={() => handleAddPostClick('개인 게시판')}>개인 게시판</li>
          <li onClick={() => handleAddPostClick('프로젝트')}>프로젝트</li>
          <li onClick={() => handleAddPostClick('CS정보란')}>CS정보란</li>
          <li onClick={() => handleAddPostClick('스터디')}>스터디</li>
        </ul>
      </div>

      {showAddPost && (
        <AddPost selectedBoard={selectedBoard} onPostSubmit={handlePostSubmit} />
      )}
    </div>
  );
};

export default BoardList;
