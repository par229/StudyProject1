import React, { useState } from 'react';
import './projectADD.css';

const ProjectADD = ({ onProjectAdd }) => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    roles: {
      박민형: '',
      김현진: '',
      조원준: '',
    },
    languages: [],
    projectContent: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is related to roles, update the specific person's role
    if (name.startsWith('role_')) {
      const person = name.replace('role_', '');
      setProjectData({
        ...projectData,
        roles: {
          ...projectData.roles,
          [person]: value,
        },
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };
  const handleFileChange = (e) => {
    setProjectData({
      ...projectData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    // 프로젝트 데이터를 부모 컴포넌트로 전달하여 목록에 추가
    onProjectAdd(projectData);

    // 폼 초기화
    setProjectData({
      projectName: '',
      roles: {
        박민형: '',
        김현진: '',
        조원준: '',
      },
      languages: [],
      projectContent: '',
      file: null,
    });
  };

  return (
    <div className="project-add">
      <h2>프로젝트 추가</h2>
      <form>
        {/* 프로젝트 입력 폼 */}
        <label>
          프로젝트 이름:
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleInputChange}
          />
        </label>

        {/* 역할 선택 폼 */}
        <label>
          박민형의 역할:
          <select
            name="role_박민형"
            value={projectData.roles.박민형}
            onChange={handleInputChange}
          >
            <option value="">선택하세요</option>
            <option value="Front">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
          </select>
        </label>

        <label>
          김현진의 역할:
          <select
            name="role_김현진"
            value={projectData.roles.김현진}
            onChange={handleInputChange}
          >
            <option value="">선택하세요</option>
            <option value="Front">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
          </select>
        </label>

        <label>
          조원준의 역할:
          <select
            name="role_조원준"
            value={projectData.roles.조원준}
            onChange={handleInputChange}
          >
            <option value="">선택하세요</option>
            <option value="Front">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
          </select>
        </label>

        {/* 프로젝트 내용 입력 폼 */}
        <label>
          프로젝트 내용:
          <textarea
            name="projectContent"
            value={projectData.projectContent}
            onChange={handleInputChange}
          />
        </label>

        {/* 파일 업로드 폼 */}
        <label>
          <input type="file" name="file" onChange={handleFileChange} />
        </label>

        {/* 저장 버튼 */}
        <button type="button" onClick={handleSubmit}>
          저장
        </button>
      </form>
    </div>
  );
};

export default ProjectADD;
