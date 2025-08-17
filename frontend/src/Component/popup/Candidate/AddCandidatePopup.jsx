import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './AddCandidatePopup.css';

const AddCandidatePopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    position: '',
    experience: '',
    resumeUrl: null,
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <p>Add New Candidate</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address*"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="position"
                placeholder="Position*"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="experience"
                placeholder="Experience*"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <div className="resume-upload">
                <input
                  type="text"
                  name="resumeFilename"
                  placeholder="Resume*"
                  value={formData.resume ? formData.resume.name : ''}
                  readOnly
                  className="form-input"
                />
                <label htmlFor="resume-upload" className="upload-button">
                  <Upload size={20} />
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  name="resume"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden-input"
                />
              </div>
            </div>
          </div>
          
          <div className="form-checkbox">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agree-terms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agree-terms">
              I hereby declare that the above information is true to the best of my knowledge and belief
            </label>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidatePopup;