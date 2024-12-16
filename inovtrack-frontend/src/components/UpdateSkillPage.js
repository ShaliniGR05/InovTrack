// UpdateSkillPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faChalkboardTeacher,
  faFileAlt,
  faProjectDiagram,
  faLaptopCode,
  faCertificate,
  faBuilding,
  faBriefcase,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import './UpdateSkillPage.css';

const UpdateSkillPage = () => {
  const navigate = useNavigate();

  const fields = [
    { name: 'Workshops/Seminars', icon: faChalkboardTeacher, route: '/form/workshops' },
    { name: 'Paper Presentations', icon: faFileAlt, route: '/form/papers' },
    { name: 'Project Presentations', icon: faProjectDiagram, route: '/form/projects' },
    { name: 'Hackathons', icon: faLaptopCode, route: '/form/hackathons' },
    { name: 'Unified Certifications', icon: faCertificate, route: '/form/certifications' },
    { name: 'Inplant Trainings', icon: faBuilding, route: '/form/trainings' },
    { name: 'Internships', icon: faBriefcase, route: '/form/internships' },
    { name: 'Others', icon: faEllipsisH, route: '/form/others' },
  ];

  const handleAddClick = (route) => {
    navigate(route); // Navigate to the specific route for each field
  };

  return (
    <div className="update-skill-container">
      <h2>Update Your Profile</h2>
      <div className="update-field-grid">
        {fields.map((field, index) => (
          <div key={index} className="update-field">
            <FontAwesomeIcon icon={field.icon} className="field-icon" />
            <span>{field.name}</span>
            <FontAwesomeIcon
              icon={faPlus}
              className="plus-icon"
              onClick={() => handleAddClick(field.route)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateSkillPage;
