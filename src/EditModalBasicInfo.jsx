import React, { useState } from "react";

function EditModalBasicInfo({ basicInfo, onUpdate, onClose }) {
  const [currentBasicInfo, setCurrentBasicInfo] = useState(basicInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBasicInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate(currentBasicInfo);
    onClose();
  };

  return (
    <div className="editmodal-container fcc-c">
      <fieldset>
        <legend>Basic Information</legend>

        <label htmlFor="name">Name:</label>
        <div className="input-container">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Input name"
            value={currentBasicInfo.name}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="email">Email:</label>
        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Input email"
            value={currentBasicInfo.email}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="phoneNum">Phone Number (Optional):</label>
        <div className="input-container">
          <input
            type="tel"
            name="phoneNum"
            id="phoneNum"
            placeholder="Input phone number"
            value={currentBasicInfo.phoneNum}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <div className="modal-btn-row fcc">
        <button className="edit-modal-button btn-1" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i> Cancel
        </button>
        <button className="edit-modal-button btn-1" onClick={handleSave}>
          <i className="fa-solid fa-check"></i> Finalize
        </button>
      </div>
    </div>
  );
}

export default EditModalBasicInfo;
