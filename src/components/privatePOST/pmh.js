// pmh.js

import React, { useState } from 'react';
import './pmh.css';
import Post from './post';

const PmhBoard = () => {
  const [posts, setPosts] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddPost = (newPost) => {
    setPosts([...posts, { ...newPost, timestamp: new Date() }]);
    setShowPost(false);
  };

  const handleAddPostClick = () => {
    setShowPost(true);
  };

  const handlePostClick = (index) => {
    setSelectedPost(posts[index]);
  };

  return (
    <div className="pmh-board">
      <h2>박민형의 게시판</h2>
      <button className="add-post-button" onClick={handleAddPostClick}>
        게시글 추가
      </button>
      {showPost && <Post onAddPost={handleAddPost} />}
      <ul className="post-list">
        {posts.map((post, index) => (
          <li key={index}>
            <span className="post-number">{index + 1}</span>
            <span className="post-title" onClick={() => handlePostClick(index)}>
              {post.title}
            </span>
            <span className="post-timestamp">{post.timestamp.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div className="selected-post">
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.content}</p>
        </div>
      )}
    </div>
  );
};

export default PmhBoard;
