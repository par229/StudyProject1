// TopContainer.js

import React from 'react';
import './TopContainer.css';

const TopContainer = () => {
  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 로그인 페이지로 이동
    window.location.href = '/login'; // '/login'은 로그인 페이지 경로에 맞게 수정
  };

  const handleGoBackClick = () => {
    // 돌아가기 버튼 클릭 시 이전 페이지로 이동
    window.history.back();
  };

  const handleMainButtonClick = () => {
    // 메인 버튼 클릭 시 메인 화면으로 이동
    window.location.href = '/'; // '/'은 메인 화면 경로에 맞게 수정
  };

  return (
    <div className="top-container">
      <div className="left-section">
        <button onClick={handleLoginClick}>로그인</button>
      </div>
      <div className="right-section">
        <button onClick={handleGoBackClick}>돌아가기</button>
      </div>
      <div className="center-section">
        <button onClick={handleMainButtonClick}>DKU SOFTWARE</button>
      </div>
    </div>
  );
};

export default TopContainer;
