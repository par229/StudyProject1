// BoardList.js

import React, { useState } from 'react';
import './BoardList.css';

const BoardList = ({ onAddPost }) => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleAddPostClick = (board) => {
    setSelectedBoard(board);
    setShowAddPost(true);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to add a post
    const newPost = {
      id: Date.now(), // Temporary unique ID (replace with actual ID from the database)
      title: e.target.title.value,
      content: e.target.content.value,
    };

    // Additional actions if needed

    // Reset states after adding post
    setSelectedBoard(null);
    setShowAddPost(false);
    onAddPost(selectedBoard, newPost); // Pass the board and new post to App.js
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
        <div className="add-post-container">
          <h2>{selectedBoard}</h2>
          <form onSubmit={handlePostSubmit}>
            <label>
              제목:
              <input type="text" name="title" />
            </label>
            <br />
            <label>
              내용:
              <textarea name="content" rows="4" />
            </label>
            <br />
            <button type="submit">게시글 추가</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BoardList;
