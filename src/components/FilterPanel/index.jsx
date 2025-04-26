import React, { useState } from "react";
import { COMMON_SKILLS } from "../../config/constants";
import "./index.css";

const FilterPanel = ({ filters, onFilterChange }) => {
  const [customSkill, setCustomSkill] = useState("");

  const handleGenderChange = (e) => {
    onFilterChange({ ...filters, gender: e.target.value });
  };

  const handleExperienceChange = (e) => {
    onFilterChange({ ...filters, experience: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    onFilterChange({ ...filters, skills: selectedSkills });
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !filters.skills.includes(customSkill.trim())) {
      onFilterChange({
        ...filters,
        skills: [...filters.skills, customSkill.trim()],
      });
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onFilterChange({
      ...filters,
      skills: filters.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filter</h3>

      <div className="filter-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={filters.gender}
          onChange={handleGenderChange}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="experience">Experience</label>
        <select
          id="experience"
          value={filters.experience}
          onChange={handleExperienceChange}
        >
          <option value="">All</option>
          {[...Array(16)].map((_, i) => (
            <option key={i} value={i}>
              {i} {i === 1 ? "year" : "years"}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Skills</label>
        <div className="selected-skills">
          {filters.skills.map((skill) => (
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
          value={filters.skills}
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
    </div>
  );
};

export default FilterPanel;
