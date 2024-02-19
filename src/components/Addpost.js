// AddPost.js

import React, { useState } from 'react';
import './Addpost.css'; // CSS 파일 import

const AddPost = ({ selectedBoard, onAddPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 게시글 추가 로직을 추가하면 됩니다.
    console.log('게시글 추가:', { board: selectedBoard, title: formData.title, content: formData.content });
    // 추가로 필요한 동작 수행

    // 게시글 추가 후 상태 초기화
    setFormData({
      title: '',
      content: '',
    });

    // 추가된 게시글 상태를 상위 컴포넌트로 전달
    onAddPost(selectedBoard, formData.title, formData.content);
  };

  return (
    <div className="add-post-container">
      <h2>{selectedBoard}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          내용:
          <textarea name="content" rows="4" value={formData.content} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">게시글 추가</button>
      </form>
    </div>
  );
};

export default AddPost;
