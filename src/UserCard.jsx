import React, { useState } from "react";
import PDFButton from "./PDFButton";

function UserCard({
  BasicInfo,
  Education = [],
  Experience = [],
  Skills = [],
  onDeleteEducation,
  onDeleteExperience,
  onDeleteSkill,
  onEditBasicInfo,
  onEditEducation,
  onEditExperience,
  onEditSkill
}) {
  const dateToString = (unformattedDate) => {
    if (!unformattedDate || unformattedDate.trim() === "") {
      return "";
    }

    if (unformattedDate === "Present") {
      return "Present";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let date;
    if (/^\d{4}-\d{2}-\d{2}$/.test(unformattedDate)) {
      date = new Date(unformattedDate);
    } else {
      return "Invalid Date";
    }

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    if (date.getTime() === today.getTime()) {
      return "Present";
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    return formatter.format(date);
  };

  return (
    <section className="display-container ">
      <div className="display-header ">
        <div className="header-entry fcc">
          <button className="edit-btn " onClick={() => onEditBasicInfo()}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <h2 className="fcc">{BasicInfo.name}</h2>

        {BasicInfo.phoneNum ? (
          <p className="display-header-desc fcc">{`${BasicInfo.email} | ${BasicInfo.phoneNum}`}</p>
        ) : (
          <p className="fcc">{BasicInfo.email}</p>
        )}
      </div>

      <hr />

      {Education.length > 0 && (
        <>
          <h2 className="display-heading">Education</h2>
          {Education.map((educ, index) => (
            <div className="data-entry" key={educ.school + index}>
              <div className="edit-btn-row ">
                <button
                  className="edit-btn"
                  onClick={() => onEditEducation(index)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="edit-btn"
                  onClick={() => onDeleteEducation(index)}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
              </div>
              <h3 className="name">{educ.school}</h3>
              <p className="date">{`${dateToString(
                educ.studyStarted
              )} - ${dateToString(educ.studyFinished)}`}</p>
              <p className="desc">{educ.fieldOfStudy}</p>
            </div>
          ))}
        </>
      )}

      {Experience.length > 0 && (
        <>
          <h2 className="display-heading">Experience</h2>
          {Experience.map((exp, index) => (
            <div className="data-entry" key={exp.company + index}>
              <div className="edit-btn-row ">
                <button
                  className="edit-btn"
                  onClick={() => onEditExperience(index)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="edit-btn"
                  onClick={() => onDeleteExperience(index)}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
              </div>
              <h3 className="name">{exp.company}</h3>
              <p className="date">{`${dateToString(
                exp.jobStarted
              )} - ${dateToString(exp.jobFinished)}`}</p>
              <p className="desc">{exp.position}</p>
            </div>
          ))}
        </>
      )}

      {Skills.length > 0 && (
        <>
          <h2 className="display-heading">Skills</h2>
          <ul className="data-entry-ul">
            {Skills.map((skill, index) => (
              <li key={index} className="data-entry-list">
                {skill}
                <div className="edit-btn-row ">
                  <button
                    className="edit-btn"
                    onClick={() => onEditSkill(index)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => onDeleteSkill(index)}
                  >
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="PDFButton-container fcc">
        <PDFButton
          BasicInfo={BasicInfo}
          Education={Education}
          Experience={Experience}
          Skills={Skills}
        />
      </div>
    </section>
  );
}

export default UserCard;
