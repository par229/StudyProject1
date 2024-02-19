// EachList.js

import React, { useState } from 'react';
import './EachList.css';

const EachList = ({ boardName, posts, onPostClick, onAddPostClick, onGoBackClick }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    onPostClick(post);
  };

  const handleAddPostClick = () => {
    setSelectedPost(null);
    onAddPostClick();
  };

  const handleGoBackClick = () => {
    setSelectedPost(null);
    onGoBackClick();
  };

  return (
    <div className="each-list-container">
      <h2>{boardName}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handlePostClick(post)}>
            {post.title}
          </li>
        ))}
      </ul>

      {selectedPost ? (
        <div className="post-details-container">
          <h3>게시글 상세 내용</h3>
          <p>제목: {selectedPost.title}</p>
          <p>내용: {selectedPost.content}</p>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={handleAddPostClick}>게시글 추가</button>
          <button onClick={handleGoBackClick}>뒤로 가기</button>
        </div>
      )}
    </div>
  );
};

export default EachList;
