// App.js

import React, { useState } from 'react';
import Login from './components/Login';
import BoardList from './components/BoardList';
import EachList from './components/EachList';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddPost = (board) => {
    setCurrentBoard(board);
    setShowAddPost(true);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <div className="main-container">
          <BoardList onAddPost={() => setShowAddPost(true)} />
          {currentBoard && showAddPost && (
            <div className="add-post-container">
              <h2>{currentBoard}</h2>
              <form>
                <label>
                  제목:
                  <input type="text" name="title" />
                </label>
                <br />
                <label>
                  내용:
                  <textarea name="content" rows="4" />
                </label>
                <br />
                <button type="submit">게시글 추가</button>
              </form>
            </div>
          )}

          {/* EachList 컴포넌트를 각 게시판에 대해 렌더링 */}
          <EachList boardName="개인 게시판" posts={[]} onPostClick={(post) => {}} onAddPostClick={handleAddPost} />
          <EachList boardName="프로젝트" posts={[]} onPostClick={(post) => {}} onAddPostClick={handleAddPost} />
          <EachList boardName="CS정보란" posts={[]} onPostClick={(post) => {}} onAddPostClick={handleAddPost} />
          <EachList boardName="스터디" posts={[]} onPostClick={(post) => {}} onAddPostClick={handleAddPost} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
