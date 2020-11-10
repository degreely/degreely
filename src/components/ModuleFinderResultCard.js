import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import SemsDropdown from "./SemsDropdown";

import { generateDashboardMod } from "../utils/generateDashboardMod";

const ModuleFinderResultCard = ({
  index,
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
    <Draggable draggableId={`mf-${code}`} index={index} key={url}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              ...provided.draggableProps.style,
            }}
          >
            <h6 className="text-primary font-weight-medium">{`${code} ${title}`}</h6>

            <p
              className="text-muted text-small"
              style={{ marginBottom: 0 }}
            >{`${department} • ${mcs} MCs`}</p>
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
                    style={{ padding: "0.175rem 0.5rem", borderRadius: "8px" }}
                    className="d-flex justify-content-center align-items-center"
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
      }}
    </Draggable>
  );
};

export default ModuleFinderResultCard;
