import React from "react";
import "./index.css";

const CandidateRow = ({ candidate }) => {
  return (
    <tr className="candidate-row">
      <td>{candidate.name}</td>
      <td>{candidate.email}</td>
      <td>{candidate.phone}</td>
      <td>{candidate.gender}</td>
      <td>{candidate.experience} years</td>
      <td className="skills-column">
        <div className="skills-container">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </td>
      <td>
        <button className="action-button">•••</button>
      </td>
    </tr>
  );
};

export default CandidateRow;
