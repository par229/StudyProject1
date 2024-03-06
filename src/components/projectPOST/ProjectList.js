// ProjectList.js

import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects, onDelete }) => {
  const handleDelete = (index) => {
    // Call the onDelete function provided by the parent component
    onDelete(index);
  };

  return (
    <div className="project-list">
      <h2>프로젝트 목록</h2>
      {projects.map((project, index) => (
        <div key={index} className="project-item">
          <h3>{project.projectName}</h3>
          <p>
            <strong>박민형의 역할:</strong> {project.roles.박민형}
          </p>
          <p>
            <strong>김현진의 역할:</strong> {project.roles.김현진}
          </p>
          <p>
            <strong>조원준의 역할:</strong> {project.roles.조원준}
          </p>
          <p>
            <strong>프로젝트 내용:</strong> {project.projectContent}
          </p>
          {/* You can add more details as needed */}
          {/* Removed the "수정" (Edit) button */}
          {/* Add a delete button and its logic */}
          <button onClick={() => handleDelete(index)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
