import React from "react";

const ModuleFinderResultCard = ({
  moduleCode: code,
  title,
  description,
  moduleCredit: mcs,
  department,
  semesterData,
  hasPreclusion,
  hasPrerequisite,
  url,
}) => {
  const semesters = semesterData.map(({ semester }) => `${semester} Semester`).join(" • ");

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h6 className="text-primary medium-font-weight">{`${code} ${title}`}</h6>

      <p className="text-muted text-small" style={{ marginBottom: 0 }}>{`${department} • ${mcs} MCs`}</p>
      <p className="text-muted text-small">{semesters}</p>

      <p className="text-small">{description}</p>

      {hasPreclusion || hasPrerequisite ? (
        <p className="text-primary text-small medium-font-weight" style={{ marginBottom: 0 }}>
          Has Preclusions/Prerequistes
        </p>
      ) : null}
      <a className="text-small" href={url} target="_blank" rel="noopener noreferrer">
        See More on NUSMods
      </a>
    </div>
  );
};

export default ModuleFinderResultCard;
