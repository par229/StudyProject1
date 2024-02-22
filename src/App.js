import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import BoardList from './components/BoardList';
import EachList from './components/EachList';
import TopContainer from './components/TopContainer';
import axios from 'axios'; // 추가된 부분

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

  const handleAddPost = async (board, newPost) => {
    const updatedPosts = { ...posts, [board]: [...posts[board], newPost] };
    setPosts(updatedPosts);

    // API를 통해 서버에 데이터 전송
    try {
      const response = await axios.post('http://localhost:8000/posts/', newPost);
      console.log(response.data); // 생성 결과 출력
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setCurrentBoard(null);
    setShowAddPost(false);
  };

  const handleGoBack = () => {
    setCurrentBoard(null);
    setShowAddPost(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: e.target.title.value,
      content: e.target.content.value,
      user_id: 1, // 임의의 사용자 ID, 실제로는 로그인 기능을 통해 동적으로 설정해야 함
      BB_code: 1, // 임의의 게시판 ID, 실제로는 동적으로 설정해야 함
      created_date: new Date(),
    };

    // API를 통해 서버에 데이터 전송
    try {
      const response = await axios.post('http://localhost:8000/posts/', newPost);
      console.log(response.data); // 생성 결과 출력
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setCurrentBoard(null);
    setShowAddPost(false);
  };

  useEffect(() => {
    // 게시글 조회 API 호출
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/');
        setPosts(response.data); // 서버에서 받은 게시글 목록으로 업데이트
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

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
              posts={posts[currentBoard]}
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
