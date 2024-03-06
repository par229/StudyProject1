// post.js

import React, { useState } from 'react';
import './post.css';

const Post = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = () => {
    // 입력된 제목과 내용을 이용하여 새로운 게시글을 생성
    const newPost = {
      title,
      content,
    };

    // 게시글 추가 이벤트를 상위 컴포넌트로 전달
    onAddPost(newPost);

    // 입력란 초기화
    setTitle('');
    setContent('');
  };

  return (
    <div className="post-container">
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleAddPost}>게시글 추가</button>
    </div>
  );
};

export default Post;
