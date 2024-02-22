import React, { useState } from 'react';
import { createUser } from './api'; // api 파일의 경로에 따라 수정

const CreateUserComponent = () => {
  const [userData, setUserData] = useState({ /* initial user data */ });

  const handleCreateUser = async () => {
    try {
      await createUser(userData);
      console.log('User created successfully!');
      // 생성 후 추가 동작
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      {/* UI 및 이벤트 핸들러 등 추가 */}
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUserComponent;
