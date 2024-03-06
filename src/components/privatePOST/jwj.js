// jwj.js

import React, { useState } from 'react';
import './jwj.css';
import Post from './post';

const JwjBoard = () => {
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
    <div className="jwj-board">
      <h2>조원준의 게시판</h2>
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

export default JwjBoard;
