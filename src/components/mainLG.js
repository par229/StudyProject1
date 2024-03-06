// mainLG.js

import React, { useState } from 'react';
import './mainLG.css';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 여기에서 실제 로그인 로직을 구현하고, 성공 시에는 onLogin 콜백을 호출합니다.
    // 로그인이 성공하면 메인 화면을 표시할 수 있도록 상태를 변경합니다.
    // 예시로 간단한 로그인 체크를 했다고 가정합니다.
    if (username === '사용자이름' && password === '비밀번호') {
      onLogin();
    } else {
      onLogin();
    }
  };

  return (
    <div className="login-screen">
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="ID"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginScreen;
