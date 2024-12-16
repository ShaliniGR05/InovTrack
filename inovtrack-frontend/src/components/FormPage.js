// FormPage.js
import React, { useState } from 'react';
import './FormPage.css';

const FormPage = ({ formType }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
  };

  const renderFields = () => {
    switch (formType) {
        case 'workshop':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Institution" name="institution" onChange={handleChange} required />
                <InputField label="Institution Type" name="institutionType" onChange={handleChange} required />
                <TextArea label="Description" name="description" onChange={handleChange} required />
                <DateField label="Date" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'paper':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Institution" name="institution" onChange={handleChange} required />
                <InputField label="Institution Type" name="institutionType" onChange={handleChange} required />
                <TextArea label="Paper Description" name="description" onChange={handleChange} required />
                <DateField label="Date" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'project':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Institution" name="institution" onChange={handleChange} required />
                <InputField label="Institution Type" name="institutionType" onChange={handleChange} required />
                <TextArea label="Project Description" name="description" onChange={handleChange} required />
                <DateField label="Date" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'hackathon':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <TextArea label="Project Description" name="description" onChange={handleChange} required />
                <InputField label="Institution" name="institution" onChange={handleChange} required />
                <InputField label="Institution Type" name="institutionType" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Duration" name="duration" onChange={handleChange} required />
                <DateField label="Date (From - To)" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'certification':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Duration" name="duration" onChange={handleChange} required />
                <DateField label="Date (From - To)" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'training':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Institution" name="institution" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Duration" name="duration" onChange={handleChange} required />
                <DateField label="Date (From - To)" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'internship':
            return (
              <>
                <InputField label="Title" name="title" onChange={handleChange} required />
                <InputField label="Role" name="role" onChange={handleChange} required />
                <InputField label="Domain" name="domain" onChange={handleChange} required />
                <InputField label="Duration" name="duration" onChange={handleChange} required />
                <DateField label="Date (From - To)" name="date" onChange={handleChange} required />
                <FileUpload label="Certificate" onChange={handleFileUpload} required />
              </>
            );
          case 'other':
            return (
              <>
                <InputField label="Event" name="event" onChange={handleChange} required />
                <InputField label="Institution (if any)" name="institution" onChange={handleChange} />
                <TextArea label="Description" name="description" onChange={handleChange} required />
                <DateField label="Date (Optional)" name="date" onChange={handleChange} />
                <InputField label="Duration (Optional)" name="duration" onChange={handleChange} />
                <FileUpload label="Certificate/Proof" onChange={handleFileUpload} required />
              </>
            );
      default:
        return <p>Invalid form type</p>;
    }
  };

  return (
    <div className="form-container">
      <h2>{formType.replace(/-/g, ' ')} Form</h2>
      <form className="form-content">
        {renderFields()}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}{required && '*'}</label>
    <input type="text" name={name} onChange={onChange} required={required} />
  </div>
);

const TextArea = ({ label, name, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}{required && '*'}</label>
    <textarea name={name} onChange={onChange} required={required} />
  </div>
);

const DateField = ({ label, name, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}{required && '*'}</label>
    <input type="date" name={name} onChange={onChange} required={required} />
  </div>
);

const FileUpload = ({ label, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}{required && '*'}</label>
    <input type="file" onChange={onChange} required={required} />
  </div>
);

export default FormPage;
