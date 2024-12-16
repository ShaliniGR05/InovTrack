import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">InovTrack</div>
      <nav>
        <ul>
          <li><Link to="/backlog" className="sidebar-link">Backlog</Link></li>
          <li><Link to="/board" className="sidebar-link">Dashboard</Link></li>
          <li>
            <button
              className="sidebar-link"
              onClick={() => navigate('/create-project')}
            >
              Create Project
            </button>
          </li>
          <li><Link to="/invites" className="sidebar-link">Invites</Link></li>
          <li><Link to="/reports" className="sidebar-link">Reports</Link></li>
          <li><Link to="/releases" className="sidebar-link">Releases</Link></li>
          <li><Link to="/components" className="sidebar-link">Components</Link></li>
          <li><Link to="/issues" className="sidebar-link">Issues</Link></li>
          <li><Link to="/repository" className="sidebar-link">Repository</Link></li>
          <li><Link to="/add-item" className="sidebar-link">Add Item</Link></li>
          <li><Link to="/settings" className="sidebar-link">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
