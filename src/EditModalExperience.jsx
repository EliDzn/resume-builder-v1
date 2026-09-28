import React, { useState } from "react";

function EditModalExperience({ experience, onUpdate, onClose }) {
  const [currentExperience, setCurrentExperience] = useState({
    ...experience,
    jobStarted: experience.jobStarted || "",
    jobFinished:
      experience.jobFinished === "Present"
        ? new Date().toISOString().slice(0, 10)
        : experience.jobFinished || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const jobStartedDate = new Date(currentExperience.jobStarted);
    const jobFinishedDate = new Date(currentExperience.jobFinished);

    const normalizeDate = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const normalizedToday = normalizeDate(today);
    const normalizedJobStartedDate = normalizeDate(jobStartedDate);
    const normalizedJobFinishedDate = normalizeDate(jobFinishedDate);

    if (
      normalizedJobStartedDate > normalizedToday ||
      normalizedJobFinishedDate > normalizedToday
    ) {
      alert("Date cannot be in the future.");
      return;
    }

    if (normalizedJobFinishedDate < normalizedJobStartedDate) {
      alert("End date cannot be before the start date.");
      return;
    }

    const formattedJobFinishedDate =
      normalizedJobFinishedDate.getTime() === normalizedToday.getTime()
        ? "Present"
        : normalizedJobFinishedDate.toISOString().slice(0, 10);

    onUpdate({ ...currentExperience, jobFinished: formattedJobFinishedDate });
    onClose();
  };

  return (
    <div className="editmodal-container fcc">
      <fieldset>
        <legend>Experience</legend>
        <label htmlFor="company">Company Name:</label>
        <div className="input-container">
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Input name of the company"
            value={currentExperience.company}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="position">Position Title:</label>
        <div className="input-container">
          <input
            type="text"
            name="position"
            id="position"
            placeholder="Input position within the company"
            value={currentExperience.position}
            onChange={handleChange}
          />
        </div>
        <div className="fulldate-container fcc">
          <div className="fulldate-subcontainer">
            <label htmlFor="jobStarted">Date Started:</label>
            <div className="input-container">
              <input
                type="date"
                name="jobStarted"
                id="jobStarted"
                value={currentExperience.jobStarted}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="fulldate-subcontainer">
            <label htmlFor="jobFinished">Date Ended:</label>
            <div className="input-container">
              <input
                type="date"
                name="jobFinished"
                id="jobFinished"
                value={
                  currentExperience.jobFinished === "Present"
                    ? new Date().toISOString().slice(0, 10)
                    : currentExperience.jobFinished
                }
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="modal-btn-row fcc">
          <button className="edit-modal-button btn-1" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
          <button className="edit-modal-button btn-1" onClick={handleSave}>
            <i className="fa-solid fa-check"></i> Finalize
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default EditModalExperience;
