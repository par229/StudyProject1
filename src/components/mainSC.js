import React, { useState } from 'react';
import './mainSC.css';
import PmhBoard from './privatePOST/pmh.js';
import JwjBoard from './privatePOST/jwj.js';
import KhjBoard from './privatePOST/khj.js';
import ProjectADD from './projectPOST/projectADD.js';
import ProjectList from './projectPOST/ProjectList.js';

const MainScreen = () => {
  const [personalBoard, setPersonalBoard] = useState(['박민형', '조원준', '김현진']);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showAddPostButton, setShowAddPostButton] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleBoardSelect = (index) => {
    if (index === 1) {
      setSelectedBoard('프로젝트');
      setShowAddPostButton(true);
    } else {
      setSelectedBoard(personalBoard);
      setShowAddPostButton(false);
    }
  };

  const handleProjectAdd = (projectData) => {
    setProjects([...projects, projectData]);
    setSelectedBoard(null); // 프로젝트 추가 후 목록으로 돌아감
    setShowAddPostButton(false);
  };

  const handleItemClick = (item) => {
    setSelectedBoard(item);
    setShowAddPostButton(false);
  };

  const handleProjectItemClick = (index) => {
    setSelectedBoard(projects[index]);
    setShowAddPostButton(false);
  };

  const handleGoBack = () => {
    setSelectedBoard(null);
    setShowAddPostButton(false);
  };

  const handleAddPostClick = () => {
    setShowAddPostButton(true);
  };

  return (
    <div className="main-screen">
      <div className="top-section">
        <div className="menu-buttons">
          <button className="menu-button" onClick={() => handleBoardSelect(0)}>
            개인 게시판
          </button>
          <button className="menu-button" onClick={() => handleBoardSelect(1)}>
            프로젝트
          </button>
          <button className="menu-button" onClick={() => handleBoardSelect(2)}>
            CS 정보
          </button>
          <button className="menu-button" onClick={() => handleBoardSelect(3)}>
            스터디
          </button>

          {selectedBoard && (
            <button className="go-back-button" onClick={handleGoBack}>
              돌아가기
            </button>
          )}

          {showAddPostButton && !selectedBoard && (
            <button className="add-post-button" onClick={handleAddPostClick}>
              게시글 추가
            </button>
          )}
        </div>
      </div>

      <div className="bottom-section">
        <div className="left-section">
          {selectedBoard ? (
            Array.isArray(selectedBoard) ? (
              <ul>
                {selectedBoard.map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(item)}>
                    {item.projectName || item}
                  </li>
                ))}
              </ul>
            ) : (
              <h2>{selectedBoard}</h2>
            )
          ) : (
            <h2>좌측 영역</h2>
          )}
        </div>
        <div className="right-section">
          {selectedBoard === '프로젝트' && (
            <>
              <ProjectADD onProjectAdd={handleProjectAdd} />
              <ProjectList projects={projects} />
            </>
          )}

          {/* 개인 게시판 컴포넌트들 추가 */}
          {selectedBoard === '박민형' && <PmhBoard />}
          {selectedBoard === '조원준' && <JwjBoard />}
          {selectedBoard === '김현진' && <KhjBoard />}

          {!selectedBoard && !showAddPostButton && <h2>우측 영역</h2>}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;