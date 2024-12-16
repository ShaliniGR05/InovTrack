import React from "react";
import "./Invites.css";

function Invites() {
  const tasks = [
    {
      title: "Task 1",
      description: "Complete the project documentation",
      sender: "User123",
    },
    {
      title: "Task 2",
      description: "Review the code for module A",
      sender: "User456",
    },
    {
      title: "Task 3",
      description: "Fix UI bugs in the dashboard",
      sender: "User789",
    },
  ];

  return (
    <div className="invites-container">
      <h1 className="invites-header">Invites</h1>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <div className="task-content">
            <div className="task-title">{task.title}</div>
            <div className="task-details">{task.description}</div>
            <div className="task-details">From: {task.sender}</div>
          </div>
          <div className="task-buttons">
            <button className="accept-button">✔ Accept</button>
            <button className="decline-button">✖ Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Invites;
