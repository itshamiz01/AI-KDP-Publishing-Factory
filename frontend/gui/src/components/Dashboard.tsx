import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Add styling here if needed

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  // Fetch projects from the backend API
  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  // Handle project creation
  const createProject = () => {
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName, status: 'New' }),
    })
      .then((response) => response.json())
      .then((newProject) => setProjects((prev) => [...prev, newProject]))
      .catch((error) => console.error('Error creating project:', error));
  };

  return (
    <div className="dashboard">
      <h1>AI Kindle Publishing Factory</h1>

      <div className="create-project">
        <h2>Create a New Project</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <button onClick={createProject}>Create Project</button>
      </div>

      <div className="project-list">
        <h2>Existing Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {project.name} - Status: {project.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;