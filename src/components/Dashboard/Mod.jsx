import React from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@material-ui/icons/Clear";
import "../../css/dashboard/Mod.css";

function Mod({ index, modData, modColor, inEditMode, isListView, handleModRightClick, handleRemoveMod }) {
  const renderModGrid = (
    <>
      <span className="mod-text-grid">
        <span className="font-weight-medium">{modData.code}</span>
        <span>{modData.name}</span>
      </span>
      {inEditMode && <ClearIcon className="mod-remove" onClick={handleRemoveMod} />}
    </>
  );

  const renderModList = (
    <>
      <span className="mod-text-list">
        <span className="font-weight-medium">{modData.code}</span>
        <br />
        <span>{modData.name}</span>
      </span>
      {inEditMode && <ClearIcon className="mod-remove" onClick={handleRemoveMod} />}
    </>
  );

  const handleRightClick = (event) => {
    event.preventDefault();
    handleModRightClick({ x: event.clientX, y: event.clientY }, modData);
  };

  return (
    <Draggable draggableId={modData.draggableId} index={index} key={modData.code}>
      {(provided, snapshot) => {
        return (
          <div
            className={`mod-${isListView ? "list" : "grid"} ${modColor}`}
            onContextMenu={handleRightClick}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isListView ? renderModList : renderModGrid}
          </div>
        );
      }}
    </Draggable>
  );
}

const mapStateToProps = (state) => ({
  isListView: state.isListView,
});

export default connect(mapStateToProps)(Mod);
