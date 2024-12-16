import React, { useState } from "react";
import axios from "axios";
import "./ProfileSidebar.css";

const ProfileSidebar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_info: "",
    linkedin_url: "",
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const [successMessage, setSuccessMessage] = useState(""); // To display success messages

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex

  const validateFields = () => {
    if (!userId.trim()) return "User ID cannot be empty.";
    if (!user.name.trim()) return "Name cannot be empty.";
    if (!isValidEmail(user.email)) return "Invalid email format.";
    if (!user.profile_info.trim()) return "Bio cannot be empty.";
    if (!user.linkedin_url.trim()) return "LinkedIn URL cannot be empty.";
    return null;
  };

  const fetchUserData = async () => {
    if (!userId.trim()) {
      setErrorMessage("Please enter a valid User ID.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.get(
        `http://localhost:8000/users/get/${userId}`
      );
      setUser(response.data);
      setSuccessMessage("Profile fetched successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error fetching user data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const validationError = validateFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.put(
        `http://localhost:8000/users/update/${userId}`,
        user
      );
      setUser(response.data);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error updating user data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-picture"></div>

      {loading && <p className="loading-indicator">Loading...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <div classname="formgroup">
      <label>User ID: </label>
      <input
        type="text"
        placeholder="Enter User ID"
        className="input-field"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      </div>
      <button className="update-button" onClick={fetchUserData}>
        Fetch Profile
      </button>

      <div classname="formgroup">
      <label>User name: </label>
      <input
        type="text"
        placeholder="Name"
        className="input-field"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      </div>

      <div classname="formgroup">
      <label>Email: </label>
      <input
        type="email"
        placeholder="Email"
        className="input-field"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      </div>

      <div classname="formgroup">
      <label>Bio: </label>
      <input
        type="text"
        placeholder="Bio"
        className="input-field"
        name="profile_info"
        value={user.profile_info}
        onChange={handleChange}
      />
      </div>

      <div classname="formgroup">
      <label>Linkedin profile: </label>
      <input
        type="text"
        placeholder="LinkedIn Profile"
        className="input-field"
        name="linkedin_url"
        value={user.linkedin_url}
        onChange={handleChange}
      />
      </div>
      <button className="update-button" onClick={handleSubmit}>
        Update Profile
      </button>
      <button className="view-cv-button">View CV</button>
    </div>
  );
};

export default ProfileSidebar;
