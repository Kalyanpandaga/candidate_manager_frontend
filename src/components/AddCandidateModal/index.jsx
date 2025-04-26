import React, { useState } from "react";
import { COMMON_SKILLS } from "../../config/constants";
import "./index.css";

const AddCandidateModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    experience: "",
    skills: [],
  });
  const [error, setError] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? (value ? parseInt(value) : "") : value,
    }));
    setError(""); // Clear error when user makes changes
  };

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      skills: selectedSkills,
    }));
    setError(""); // Clear error when user makes changes
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()],
      }));
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add candidate");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience (Years)</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select Experience</option>
              {[...Array(16)].map((_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "year" : "years"}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="selected-skills">
              {formData.skills.map((skill) => (
                <span key={skill} className="selected-skill-tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="remove-skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <select
              multiple
              value={formData.skills}
              onChange={handleSkillsChange}
              className="skills-select"
            >
              {COMMON_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="custom-skill-input">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add other skill..."
                className="custom-skill-field"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="add-skill-btn"
                disabled={!customSkill.trim()}
              >
                Add
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add Candidate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
