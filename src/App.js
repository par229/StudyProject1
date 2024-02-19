// App.js

import React, { useState } from 'react';
import Login from './components/Login';
import BoardList from './components/BoardList';
import EachList from './components/EachList';
import TopContainer from './components/TopContainer';
import './App.css';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [posts, setPosts] = useState({
    '개인 게시판': [],
    '프로젝트': [],
    'CS정보란': [],
    '스터디': [],
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentBoard(null);
    setShowAddPost(false);
  };

  const handleAddPost = (board, newPost) => {
    // Implement the logic to add a post to the specified board
    const updatedPosts = { ...posts, [board]: [...posts[board], newPost] };
    setPosts(updatedPosts);

    // Additional actions if needed

    // Reset states after adding post
    setCurrentBoard(null);
    setShowAddPost(false);
  };

  const handleGoBack = () => {
    setCurrentBoard(null);
    setShowAddPost(false);
  };
  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to add a post
    console.log('게시글 추가:', { board: currentBoard, title: e.target.title.value, content: e.target.content.value });
    // Additional actions if needed

    // Reset states after adding post
    setCurrentBoard(null);
    setShowAddPost(false);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <div className="main-container">
          {/* 추가된 TopContainer */}
          <TopContainer />

          {/* BoardList 컴포넌트 변경 사항 적용 */}
          <BoardList onAddPost={handleAddPost} />

          {currentBoard && showAddPost && (
            <div className="add-post-container">
              <h2>{currentBoard}</h2>
              <form onSubmit={handlePostSubmit}>
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

          {(currentBoard && !showAddPost) && (
            <EachList
              boardName={currentBoard}
              posts={posts[currentBoard]} // Pass the posts of the current board
              onPostClick={(post) => {}}
              onAddPostClick={handleAddPost}
              onGoBackClick={handleGoBack}
            />
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;