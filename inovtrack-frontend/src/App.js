// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import ProfileSidebar from './components/ProfileSidebar';
import AcademicSection from './components/AcademicSection';
import SkillDevelopmentSection from './components/SkillDevelopmentSection';
import UpdateSkillPage from './components/UpdateSkillPage';
import CreateProject from './components/CreateProject';
import FormPage from './components/FormPage';
import Invites from './components/Invites';
import './App.css';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();

  return (
    <div className="app">
      {/* Conditionally render Sidebar for routes except profile, update-skill, create-project, and all form routes */}
      {location.pathname !== '/profile' &&
       location.pathname !== '/update-skill' &&
       location.pathname !== '/create-project' &&
       !location.pathname.startsWith('/form') && <Sidebar />}

      <div className="main-content">
        <Header />
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/board" element={<Board />} />
          <Route path="/" element={<Board />} />

          {/* Profile Routes */}
          <Route
            path="/profile"
            element={
              <div className="profile-academic-container">
                <ProfileSidebar />
                <div className="main-content">
                  <AcademicSection />
                  <SkillDevelopmentSection />
                </div>
              </div>
            }
          />
          <Route path="/update-skill" element={<UpdateSkillPage />} />

          {/* Create Project Route */}
          <Route
            path="/create-project"
            element={
              <div className="create-project-container">
                <CreateProject />
              </div>
            }
          />

          {/* Form Routes for Each Field */}
          <Route path="/form/workshops" element={<FormPage formType="workshop" />} />
          <Route path="/form/papers" element={<FormPage formType="paper" />} />
          <Route path="/form/projects" element={<FormPage formType="project" />} />
          <Route path="/form/hackathons" element={<FormPage formType="hackathon" />} />
          <Route path="/form/certifications" element={<FormPage formType="certification" />} />
          <Route path="/form/trainings" element={<FormPage formType="training" />} />
          <Route path="/form/internships" element={<FormPage formType="internship" />} />
          <Route path="/form/others" element={<FormPage formType="other" />} />

          {/* Invites Route */}
          <Route path="/invites" element={<Invites />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
