import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Form from "./Form";
import Display from "./Display";

function Header() {
  return (
    <>
      <header id="header">
        <h1>Online Resume Creator</h1>
        <p>Created by Eli Dizon</p>
      </header>
    </>
  );
}

function ReturnBtn() {
  return (
    <>
      <a className="return-top-btn" href="#header">
        <i className="fa-solid fa-chevron-up"></i>
      </a>
    </>
  );
}

function App() {
  const fontOptions = [
    { name: "Inter", value: '"Inter", Helvetica, sans-serif' },
    { name: "DM Sans", value: '"DM Sans", Helvetica, sans-serif' },
    { name: "Source Sans 3", value: '"Source Sans 3", Helvetica, sans-serif' },
    { name: "Space Grotesk", value: '"Space Grotesk", Courier, monospace' },
    { name: "Times New Roman", value: '"Times New Roman", serif' },
    { name: "Playfair Display", value: '"Playfair Display", serif' },
    { name: "Noto Serif", value: '"Noto Serif", serif' }
  ];

  const [currentFont, setCurrentFont] = useState(fontOptions[0].value);

  const handleFontChange = (fontValue) => {
    setCurrentFont(fontValue);
  };

  const [darkMode, setDarkMode] = useState(false);

  // Form Submission logic
  const [BasicInfo, setBasicInfo] = useState({});
  const [Education, setEducation] = useState([]);
  const [Experience, setExperience] = useState([]);
  const [Skills, setSkills] = useState([]);

  const handleFormSubmit = ({ BasicInfo, Education, Experience, Skills }) => {
    setBasicInfo(BasicInfo);
    setEducation(Education);
    setExperience(Experience);
    setSkills(Skills);
  };

  // Display Logic
  const handleDeleteEducation = (index) => {
    const updatedEducationList = [...Education];
    updatedEducationList.splice(index, 1);
    setEducation(updatedEducationList);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperienceList = [...Experience];
    updatedExperienceList.splice(index, 1);
    setExperience(updatedExperienceList);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkillsList = [...Skills];
    updatedSkillsList.splice(index, 1);
    setSkills(updatedSkillsList);
  };

  // Modal/data editing logic
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

  const handleOpenModal = (type, data, index) => {
    setModalType(type);
    setModalData(data);
    setModalIndex(index);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setModalData(null);
    setModalIndex(null);
  };

  const handleUpdateBasicInfo = (updatedInfo) => {
    setBasicInfo(updatedInfo);
  };

  const handleUpdateEducation = (index, updatedEducation) => {
    const updatedEducationList = [...Education];
    updatedEducationList[index] = updatedEducation;
    setEducation(updatedEducationList);
  };

  const handleUpdateExperience = (index, updatedExperience) => {
    const updatedExperienceList = [...Experience];
    updatedExperienceList[index] = updatedExperience;
    setExperience(updatedExperienceList);
  };

  const handleUpdateSkill = (index, updatedSkill) => {
    const updatedSkillsList = [...Skills];
    updatedSkillsList[index] = updatedSkill;
    setSkills(updatedSkillsList);
  };

  return (
    <div
      className="app-container"
      style={{ fontFamily: currentFont }}
      data-theme={darkMode ? "dark" : "light"}
    >
      <Navbar
        fontOptions={fontOptions}
        currentFont={currentFont}
        onFontChange={handleFontChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="page-container fcc-c" style={{ fontFamily: currentFont }}>
        <Header currentFont={currentFont} />
        <Form currentFont={currentFont} onSubmit={handleFormSubmit} />
        <Display
          currentFont={currentFont}
          BasicInfo={BasicInfo}
          Education={Education}
          Experience={Experience}
          Skills={Skills}
          onDeleteEducation={handleDeleteEducation}
          onDeleteExperience={handleDeleteExperience}
          onDeleteSkill={handleDeleteSkill}
          onUpdateBasicInfo={handleUpdateBasicInfo}
          onUpdateEducation={handleUpdateEducation}
          onUpdateExperience={handleUpdateExperience}
          onUpdateSkill={handleUpdateSkill}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          modalType={modalType}
          modalData={modalData}
          modalIndex={modalIndex}
        />
        <ReturnBtn />
      </div>
    </div>
  );
}

export default App;
