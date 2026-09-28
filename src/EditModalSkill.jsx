import React, { useState, useEffect } from "react";

function EditModalSkill({ skills = "", onUpdate, onClose }) {
  const [skillValue, setSkillValue] = useState(skills);

  useEffect(() => {
    if (skills) {
      setSkillValue(skills);
    }
  }, [skills]);

  const handleSkillChange = (e) => {
    setSkillValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(skillValue);
    onClose();
  };

  return (
    <div className="editmodal-container fcc">
      <fieldset>
        <legend>Edit Skill</legend>
        <label htmlFor="skill">Skill Name:</label>
        <div className="input-container">
          <input
            type="text"
            name="skill"
            id="skill"
            placeholder="Input skill"
            value={skillValue}
            onChange={handleSkillChange}
            required
          />
        </div>

        <div className="modal-btn-row fcc">
          <button className="edit-modal-button btn-1" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
          <button className="edit-modal-button btn-1" onClick={handleSubmit}>
            <i className="fa-solid fa-check"></i> Finalize
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default EditModalSkill;
