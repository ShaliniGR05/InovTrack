import React, { useState } from "react";
import "./CreateProject.css";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [githubLink, setGithubLink] = useState(""); // Added field for GitHub link
  const [teamMembers, setTeamMembers] = useState([{ name: "", role: "Developer" }]);
  const [tasks, setTasks] = useState([{ name: "", assignedRole: "Nil" }]);

  const handleProjectNameChange = (e) => setProjectName(e.target.value);
  const handleProjectDomainChange = (e) => setProjectDomain(e.target.value);
  const handleProjectDescriptionChange = (e) => setProjectDescription(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleGithubLinkChange = (e) => setGithubLink(e.target.value);

  const addTeamMember = () => {
    if (teamMembers.length < 8) {
      setTeamMembers([...teamMembers, { name: "", role: "Developer" }]);
    } else {
      alert("You can only add up to 8 team members.");
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = teamMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setTeamMembers(updatedMembers);
  };

  const addTask = () => {
    setTasks([...tasks, { name: "", assignedRole: "Nil" }]);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      projectName,
      projectDomain,
      projectDescription,
      startDate,
      endDate,
      githubLink, // Include GitHub link in the submission
      teamMembers,
      tasks,
    };
    console.log("Project Created:", projectData);
  };

  return (
    <div className="create-project-form">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input type="text" value={projectName} onChange={handleProjectNameChange} required />
        </div>

        <div className="form-group">
          <label>Project Domain:</label>
          <input type="text" value={projectDomain} onChange={handleProjectDomainChange} required />
        </div>

        <div className="form-group">
          <label>Project Description:</label>
          <textarea value={projectDescription} onChange={handleProjectDescriptionChange} required />
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={handleStartDateChange} required />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} required />
        </div>

        <div className="form-group">
          <label>GitHub Project Link:</label>
          <input
            type="url"
            placeholder="Enter GitHub project URL"
            value={githubLink}
            onChange={handleGithubLinkChange}
            required
          />
        </div>

        <h3>Team Members</h3>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <input
              type="text"
              placeholder="Member Name"
              value={member.name}
              onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
              required
            />
            <select
              value={member.role}
              onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Lead">Lead</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
        ))}
        <button type="button" className="add-member-button" onClick={addTeamMember}>
          Add Team Member
        </button>

        <h3>Tasks</h3>
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <input
              type="text"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => handleTaskChange(index, "name", e.target.value)}
              required
            />
            <select
              value={task.assignedRole}
              onChange={(e) => handleTaskChange(index, "assignedRole", e.target.value)}
            >
              <option value="Nil">Nil</option>
              <option value="Admin">Admin</option>
              <option value="Lead">Lead</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
        ))}
        <button type="button" className="add-task-button" onClick={addTask}>
          Add Task
        </button>

        <div className="button-group">
          <button type="submit" className="create-button">Create Project</button>
          <button type="button" className="automate-button">Automate Task Assignment</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
