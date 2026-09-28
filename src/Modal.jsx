import EditModalBasicInfo from "./EditModalBasicInfo";
import EditModalEducation from "./EditModalEducation";
import EditModalExperience from "./EditModalExperience";
import EditModalSkill from "./EditModalSkill";

function Modal({ type, data, onClose, onUpdate }) {
  const renderModalContent = () => {
    switch (type) {
      case "basic":
        return (
          <EditModalBasicInfo
            basicInfo={data}
            onUpdate={onUpdate}
            onClose={onClose}
          />
        );
      case "education":
        return (
          <EditModalEducation
            education={data}
            onUpdate={onUpdate}
            onClose={onClose}
          />
        );
      case "experience":
        return (
          <EditModalExperience
            experience={data}
            onUpdate={onUpdate}
            onClose={onClose}
          />
        );
      case "skill":
        return (
          <EditModalSkill skills={data} onUpdate={onUpdate} onClose={onClose} />
        );
    }
  };

  return (
    <div className="modal-container fcc-c">
      <div className="overlay" onClick={onClose}></div>
      <div className="modaltxt-container fcc">{renderModalContent()}</div>
    </div>
  );
}

export default Modal;
