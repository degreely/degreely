import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { generateDashboardMod } from "../utils/generateDashboardMod";
import SemsDropdown from "./SemsDropdown";

const ModuleFinderResultCard = ({
  moduleCode: code,
  title,
  moduleCredit: mcs,
  department,
  semesterData,
  hasPreclusion,
  hasPrerequisite,
  url,
  containingSemester,
  semesterOptions = [],
  handleAddMod,
}) => {
  const semesters = semesterData.map(({ semester }) => `Semester ${semester}`).join(" • ");

  const moveMod = (eventKey) => handleAddMod(generateDashboardMod(code, eventKey), eventKey);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h6 className="text-primary font-weight-medium">{`${code} ${title}`}</h6>

      <p className="text-muted text-small" style={{ marginBottom: 0 }}>{`${department} • ${mcs} MCs`}</p>
      <p className="text-muted text-small">{semesters}</p>

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
            <p className="text-primary text-small font-weight-medium" style={{ marginBottom: 0 }}>
              Has Preclusions/Prerequistes
            </p>
          ) : null}
          <a className="text-small" href={url} target="_blank" rel="noopener noreferrer">
            See More on NUSMods
          </a>
        </div>
        {containingSemester ? (
          <div className="bg-primary text-white" style={{ padding: "0 0.5rem", borderRadius: "16px" }}>
            <span className="text-small font-weight-medium">{containingSemester}</span>
          </div>
        ) : (
          <Dropdown navbar className="selector-dropdown">
            <Dropdown.Toggle
              id={`${code}-dropdown`}
              data-toggle="dropdown"
              variant="outline-primary"
              style={{ padding: "0 0.5rem", borderRadius: "16px" }}
            >
              <span className="text-small font-weight-medium">Add to</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <SemsDropdown semsNames={semesterOptions} allocatedSemName={null} moveMod={moveMod} />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default ModuleFinderResultCard;
