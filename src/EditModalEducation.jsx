import { useState } from "react";

function EditModalEducation({ education, onUpdate, onClose }) {
  const [currentEducation, setCurrentEducation] = useState({
    ...education,
    studyStarted: education.studyStarted || "",
    studyFinished:
      education.studyFinished === "Present"
        ? new Date().toISOString().slice(0, 10)
        : education.studyFinished || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const studyStartedDate = new Date(currentEducation.studyStarted);
    const studyFinishedDate = new Date(currentEducation.studyFinished);

    const normalizeDate = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const normalizedToday = normalizeDate(today);
    const normalizedStudyStartedDate = normalizeDate(studyStartedDate);
    const normalizedStudyFinishedDate = normalizeDate(studyFinishedDate);

    if (
      normalizedStudyStartedDate > normalizedToday ||
      normalizedStudyFinishedDate > normalizedToday
    ) {
      alert("Date cannot be in the future.");
      return;
    }

    if (normalizedStudyFinishedDate < normalizedStudyStartedDate) {
      alert("End date cannot be before the start date.");
      return;
    }

    const formattedStudyFinishedDate =
      normalizedStudyFinishedDate.getTime() === normalizedToday.getTime()
        ? "Present"
        : normalizedStudyFinishedDate.toISOString().slice(0, 10);

    onUpdate({
      ...currentEducation,
      studyFinished: formattedStudyFinishedDate
    });
    onClose();
  };

  return (
    <div className="editmodal-container fcc">
      <fieldset>
        <legend>Education</legend>
        <label htmlFor="school">School Name:</label>
        <div className="input-container">
          <input
            type="text"
            name="school"
            id="school"
            placeholder="Input the name of the school"
            value={currentEducation.school}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="fieldOfStudy">Field/Title of Study:</label>
        <div className="input-container">
          <input
            type="text"
            name="fieldOfStudy"
            id="fieldOfStudy"
            placeholder="Input field/title of study"
            value={currentEducation.fieldOfStudy}
            onChange={handleChange}
          />
        </div>
        <div className="fulldate-container fcc">
          <div className="fulldate-subcontainer">
            <label htmlFor="studyStarted">Date Started:</label>
            <div className="input-container">
              <input
                type="date"
                name="studyStarted"
                id="studyStarted"
                value={currentEducation.studyStarted}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="fulldate-subcontainer">
            <label htmlFor="studyFinished">Date Ended:</label>
            <div className="input-container">
              <input
                type="date"
                name="studyFinished"
                id="studyFinished"
                value={
                  currentEducation.studyFinished === "Present"
                    ? new Date().toISOString().slice(0, 10)
                    : currentEducation.studyFinished
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

export default EditModalEducation;
