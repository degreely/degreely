import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

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
  containingSemester,
  semesterOptions = [],
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {hasPreclusion || hasPrerequisite ? (
            <p className="text-primary text-small medium-font-weight" style={{ marginBottom: 0 }}>
              Has Preclusions/Prerequistes
            </p>
          ) : null}
          <a className="text-small" href={url} target="_blank" rel="noopener noreferrer">
            See More on NUSMods
          </a>
        </div>
        {containingSemester ? (
          <div className="bg-primary text-white" style={{ padding: "0 0.5rem", borderRadius: "16px" }}>
            <span className="text-small medium-font-weight">{containingSemester}</span>
          </div>
        ) : (
          <Dropdown navbar className="selector-dropdown">
            <Dropdown.Toggle
              id={`${code}-dropdown`}
              data-toggle="dropdown"
              variant="outline-primary"
              style={{ padding: "0 0.5rem", borderRadius: "16px" }}
            >
              <span className="text-small medium-font-weight">Add to</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {semesterOptions.map((option) => (
                <Dropdown.Item key={option}>{option}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default ModuleFinderResultCard;
