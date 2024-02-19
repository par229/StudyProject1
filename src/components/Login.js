import React, { useState } from 'react';
import './Login.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    // 여기에서 로그인 처리 로직을 추가하면 됩니다.
    console.log('로그인 시도:', formData);
    // 예를 들면, 실제로는 서버로 데이터를 전송하거나 다른 로직을 수행할 수 있습니다.
    onLogin(); // 부모 컴포넌트로 로그인 알림
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
