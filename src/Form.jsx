import { useState } from "react";

function Form({ onSubmit }) {
  const [BasicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phoneNum: ""
  });

  const [Education, setEducation] = useState([]);
  const [Experience, setExperience] = useState([]);

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    fieldOfStudy: "",
    studyStarted: "",
    studyFinished: ""
  });

  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    jobStarted: "",
    jobFinished: ""
  });

  const [Skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value
    }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value
    }));
  };

  const handleSkillChange = (event) => {
    setSkillInput(event.target.value);
  };

  const addEducation = () => {
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
      currentEducation.school === "" ||
      currentEducation.fieldOfStudy === "" ||
      currentEducation.studyStarted === "" ||
      currentEducation.studyFinished === ""
    ) {
      alert("Kindly fill up missing information within the education section");
      return;
    }

    if (
      normalizedStudyStartedDate > normalizedToday ||
      normalizedStudyFinishedDate > normalizedToday
    ) {
      console.log(
        `Study Started: ${normalizedStudyStartedDate}, Today: ${normalizedToday}`
      );
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

    setEducation((prevEducation) => [
      ...prevEducation,
      { ...currentEducation, studyFinished: formattedStudyFinishedDate }
    ]);

    setCurrentEducation({
      school: "",
      fieldOfStudy: "",
      studyStarted: "",
      studyFinished: ""
    });

    alert("Education information submitted");
  };

  const addExperience = () => {
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
      currentExperience.company === "" ||
      currentExperience.position === "" ||
      currentExperience.jobStarted === "" ||
      currentExperience.jobFinished === ""
    ) {
      alert("Kindly fill up missing information within the experience section");
      return;
    }

    if (
      normalizedJobStartedDate > normalizedToday ||
      normalizedJobFinishedDate > normalizedToday
    ) {
      console.log(
        `Job Started: ${normalizedJobStartedDate}, Today: ${normalizedToday}`
      );
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

    setExperience((prevExperience) => [
      ...prevExperience,
      { ...currentExperience, jobFinished: formattedJobFinishedDate }
    ]);

    setCurrentExperience({
      company: "",
      position: "",
      jobStarted: "",
      jobFinished: ""
    });

    alert("Experience information submitted");
  };

  const addSkill = () => {
    if (skillInput.trim() === "") {
      alert(
        "Kindly ensure that skill information is not empty before submitting."
      );
      return;
    }

    setSkills((prevSkills) => [...prevSkills, skillInput]);
    setSkillInput("");

    alert("Skill submitted");
  };

  const deleteCurrentData = () => {
    setBasicInfo({
      name: "",
      email: "",
      phoneNum: ""
    });
    setEducation([]);
    setExperience([]);
    setCurrentEducation({
      school: "",
      fieldOfStudy: "",
      studyStarted: "",
      studyFinished: ""
    });
    setCurrentExperience({
      company: "",
      position: "",
      jobStarted: "",
      jobFinished: ""
    });

    alert("All submitted information has now been cleared");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (BasicInfo.name === "" || BasicInfo.email === "") {
      alert(
        "Name and email are required fields, kindly fill up the necessary information."
      );
      return;
    }

    console.log("Form Submission Data:", {
      BasicInfo,
      Education,
      Experience,
      Skills
    });

    onSubmit({ BasicInfo, Education, Experience, Skills });

    setBasicInfo({ name: "", email: "", phoneNum: "" });
    setEducation([]);
    setExperience([]);
    setCurrentEducation({
      school: "",
      fieldOfStudy: "",
      studyStarted: "",
      studyFinished: ""
    });
    setCurrentExperience({
      company: "",
      position: "",
      jobStarted: "",
      jobFinished: ""
    });
  };

  return (
    <>
      <section className="form-container fcc-c">
        <h2>Kindly Submit Your Information Here:</h2>
        <form onSubmit={handleSubmit} className="fcc-c">
          <fieldset>
            <legend>Basic Information</legend>

            <label htmlFor="name">Name:</label>
            <div className="input-container">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Input name"
                value={BasicInfo.name}
                onChange={handleBasicInfoChange}
              />
            </div>

            <label htmlFor="email">Email:</label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Input email"
                value={BasicInfo.email}
                onChange={handleBasicInfoChange}
              />
            </div>

            <label htmlFor="phoneNum">Phone Number (Optional):</label>
            <div className="input-container">
              <input
                type="tel"
                name="phoneNum"
                id="phoneNum"
                placeholder="Input phone number"
                value={BasicInfo.phoneNum}
                onChange={handleBasicInfoChange}
              />
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>Educational Background</legend>
            <label htmlFor="school">School Name:</label>
            <div className="input-container">
              <input
                type="text"
                name="school"
                id="school"
                placeholder="Input the name of the school"
                value={currentEducation.school}
                onChange={handleEducationChange}
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
                onChange={handleEducationChange}
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
                    onChange={handleEducationChange}
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
                    value={currentEducation.studyFinished}
                    onChange={handleEducationChange}
                  />
                </div>
              </div>
            </div>

            <div className="add-info-container fcc-c">
              <button className="btn-1" type="button" onClick={addEducation}>
                <i className="fa-solid fa-plus"></i> Add Information
              </button>
            </div>
          </fieldset>
          <hr />
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
                onChange={handleExperienceChange}
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
                onChange={handleExperienceChange}
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
                    onChange={handleExperienceChange}
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
                    value={currentExperience.jobFinished}
                    onChange={handleExperienceChange}
                  />
                </div>
              </div>
            </div>

            <div className="add-info-container fcc-c">
              <button className="btn-1" type="button" onClick={addExperience}>
                <i className="fa-solid fa-plus"></i> Add Information
              </button>
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>Skills</legend>
            <label htmlFor="skill">Skill Name:</label>
            <div className="input-container">
              <input
                type="text"
                name="skill"
                id="skill"
                placeholder="Input skill"
                value={skillInput}
                onChange={handleSkillChange}
              />
            </div>

            <div className="add-info-container fcc-c">
              <button className="btn-1" type="button" onClick={addSkill}>
                <i className="fa-solid fa-plus"></i> Add Information
              </button>
            </div>
          </fieldset>

          <hr />

          <div className="btn-row fcc">
            <button className="btn-1" type="submit">
              <i className="fa-solid fa-paper-plane"></i> Finalize Information
            </button>
            <button className="btn-1" type="button" onClick={deleteCurrentData}>
              <i className="fa-solid fa-eraser"></i> Clear Information
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
