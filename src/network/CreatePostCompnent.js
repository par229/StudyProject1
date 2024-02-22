import React, { useState } from 'react';
import { createPost } from './api'; // api 파일의 경로에 따라 수정

const CreatePostComponent = () => {
  const [postData, setPostData] = useState({ /* initial post data */ });

  const handleCreatePost = async () => {
    try {
      await createPost(postData);
      console.log('Post created successfully!');
      // 생성 후 추가 동작
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      {/* UI 및 이벤트 핸들러 등 추가 */}
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePostComponent;
