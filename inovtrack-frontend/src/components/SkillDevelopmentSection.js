import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./SkillDevelopmentSection.css";

const SkillDevelopmentSection = () => {
  const navigate = useNavigate();  // Hook for navigation
  const skills = [
    { title: "Projects", tasks: 3 },
    { title: "Papers", tasks: 2 },
    { title: "Certifications", tasks: 4 },
    { title: "Workshops", tasks: 5 },
    { title: "Hackathons", tasks: 3 },
  ];

  return (
    <div className="skill-development-section">
      <h2>Skill Development</h2>
      <div className="filter-tabs">
        {["All", ...skills.map((skill) => skill.title)].map((tab) => (
          <button key={tab} className="filter-tab">
            {tab}
          </button>
        ))}
      </div>
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.title} className="skill-category">
            <h3>{skill.title}</h3>
            <div className="skill-cards">
              {Array.from({ length: skill.tasks }, (_, index) => (
                <div
                  key={index}
                  className="skill-card"
                  onClick={() => window.alert(`Redirecting to ${skill.title} page`)}
                >
                  <div className="skill-card-content">
                    <h4>Card {index + 1}</h4>
                    <p>Details about {skill.title} {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="update-skill-button" onClick={() => navigate("/update-skill")}>
        Update Skill
      </button>
    </div>
  );
};

export default SkillDevelopmentSection;
