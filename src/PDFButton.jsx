import React from "react";
import { jsPDF } from "jspdf";

function PDFButton({ BasicInfo, Education, Experience, Skills }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const textColor = "#121212";
    const greyColor = "#686666";
    const printedFont = "Times New Roman";
    const marginInInches = 0.2;
    const marginPoints = marginInInches * 72;
    const pageWidth = doc.internal.pageSize.getWidth();
    const narrowMarginStart = marginPoints;

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

    // Print BasicInfo name
    doc.setFont(printedFont, "bold");
    doc.setFontSize(18);
    doc.setTextColor(textColor);
    const nameWidth = doc.getTextWidth(BasicInfo.name);
    const nameX = (pageWidth - nameWidth) / 2;
    doc.text(BasicInfo.name, nameX, narrowMarginStart);

    // Print email and phone number
    doc.setFont(printedFont, "normal");
    doc.setFontSize(12);
    const contactText = `${BasicInfo.email}${
      BasicInfo.phoneNum ? " | " + BasicInfo.phoneNum : ""
    }`;
    const contactWidth = doc.getTextWidth(contactText);
    const contactX = (pageWidth - contactWidth) / 2;
    doc.setTextColor(greyColor);
    doc.text(contactText, contactX, narrowMarginStart + 6);

    // Draw divider line
    doc.setLineWidth(0.25);
    doc.setDrawColor(textColor);
    doc.line(
      marginPoints,
      narrowMarginStart + 8.5,
      pageWidth - marginPoints,
      narrowMarginStart + 8.5
    );

    let y = narrowMarginStart + 20;

    // Education section
    if (Education.length > 0) {
      doc.setFontSize(20);
      doc.setTextColor(textColor);
      doc.setFont(printedFont, "bold");
      doc.text("Education", marginPoints, y);
      y += 8;

      // Title and detail font sizes for education entries
      const entryTitleFontSize = 14;
      const entryDetailFontSize = 12;
      const entrySpacing = 24; // Spacing between entries

      Education.forEach((educ) => {
        // Title
        doc.setFont(printedFont, "bold");
        doc.setFontSize(entryTitleFontSize);
        doc.setTextColor(textColor);
        doc.text(educ.school, marginPoints, y);

        // Date and field of study
        doc.setFont(printedFont, "normal");
        doc.setFontSize(entryDetailFontSize);
        doc.setTextColor(greyColor);
        doc.text(
          `${dateToString(educ.studyStarted)} - ${dateToString(
            educ.studyFinished
          )}`,
          marginPoints,
          y + 6
        );
        doc.setFont(printedFont, "bold");
        doc.setTextColor(textColor);
        doc.text(educ.fieldOfStudy, marginPoints, y + 12);

        y += entrySpacing;
      });
      y += 4;
    }

    // Experience section
    if (Experience.length > 0) {
      doc.setFontSize(20);
      doc.setTextColor(textColor);
      doc.setFont(printedFont, "bold");
      doc.text("Experience", marginPoints, y);
      y += 8;

      // Title and detail font sizes for experience entries
      const entryTitleFontSize = 14;
      const entryDetailFontSize = 12;
      const entrySpacing = 24; // Spacing between entries

      Experience.forEach((exp) => {
        // Title
        doc.setFont(printedFont, "bold");
        doc.setFontSize(entryTitleFontSize);
        doc.setTextColor(textColor);
        doc.text(exp.company, marginPoints, y);

        // Date and position
        doc.setFont(printedFont, "normal");
        doc.setFontSize(entryDetailFontSize);
        doc.setTextColor(greyColor);
        doc.text(
          `${dateToString(exp.jobStarted)} - ${dateToString(exp.jobFinished)}`,
          marginPoints,
          y + 6
        );
        doc.setFont(printedFont, "bold");
        doc.setTextColor(textColor);
        doc.text(exp.position, marginPoints, y + 12);

        // Increment y position
        y += entrySpacing;
      });
      y += 4;
    }

    // Skills section
    if (Skills.length > 0) {
      doc.setFontSize(20);
      doc.setTextColor(textColor);
      doc.setFont(printedFont, "bold");
      doc.text("Skills", marginPoints, y);
      y += 8;

      const skillFontSize = 14;
      const bullet = "• ";
      const bulletIndent = marginPoints;
      const bulletSpacing = 8;

      doc.setFont(printedFont, "normal");
      doc.setFontSize(skillFontSize);
      doc.setTextColor(textColor);

      Skills.forEach((skill) => {
        doc.text(bullet + skill, bulletIndent, y);
        y += bulletSpacing;
      });
      y += 4;
    }

    doc.save(BasicInfo.name + "CV.pdf");
  };

  return (
    <>
      <button className="btn-1" onClick={generatePDF}>
        <i className="fa-regular fa-file-pdf"></i> Save as PDF
      </button>
    </>
  );
}

export default PDFButton;
