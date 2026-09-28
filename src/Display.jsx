import UserCard from "./UserCard";
import Modal from "./Modal";

function Display({
  currentFont,
  BasicInfo,
  Education,
  Experience,
  Skills,
  onDeleteEducation,
  onDeleteExperience,
  onDeleteSkill,
  onUpdateBasicInfo,
  onUpdateEducation,
  onUpdateExperience,
  onUpdateSkill,
  onOpenModal,
  onCloseModal,
  modalType,
  modalData,
  modalIndex
}) {
  const onEditEducation = (index) => {
    onOpenModal("education", Education[index], index);
  };

  const onEditExperience = (index) => {
    onOpenModal("experience", Experience[index], index);
  };

  const onEditSkill = (index) => {
    onOpenModal("skill", Skills[index], index);
  };

  return (
    <>
      {BasicInfo && Object.keys(BasicInfo).length > 0 && (
        <>
          <hr />
          <h2 className="display-label">Document Preview:</h2>
          <UserCard
            currentFont={currentFont}
            BasicInfo={BasicInfo}
            Education={Education}
            Experience={Experience}
            Skills={Skills}
            onEditBasicInfo={() => onOpenModal("basic", BasicInfo)}
            onEditEducation={onEditEducation}
            onEditExperience={onEditExperience}
            onEditSkill={onEditSkill}
            onDeleteEducation={onDeleteEducation}
            onDeleteExperience={onDeleteExperience}
            onDeleteSkill={onDeleteSkill}
          />
          {modalType && (
            <Modal
              type={modalType}
              data={modalData}
              onUpdate={
                modalType === "basic"
                  ? onUpdateBasicInfo
                  : modalType === "education"
                  ? (updatedData) => onUpdateEducation(modalIndex, updatedData)
                  : modalType === "experience"
                  ? (updatedData) => onUpdateExperience(modalIndex, updatedData)
                  : modalType === "skill"
                  ? (updatedData) => onUpdateSkill(modalIndex, updatedData)
                  : null
              }
              onClose={onCloseModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default Display;
