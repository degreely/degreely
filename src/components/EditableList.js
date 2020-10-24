import React from "react";

import DeleteIcon from "@material-ui/icons/Clear";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import IconButton from "./IconButton";

const EditableList = ({ items, onDelete, onAdd, addLabel, hasMoreOptions, onOpenMoreOptions, listStyle }) => {
  return (
    <ul className="list-group list-group-flush" style={listStyle}>
      {items.map((item) => (
        <li
          key={item}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ border: 0 }}
        >
          {item}
          <div className="btn-group" role="group" aria-label="Basic example">
            {hasMoreOptions && (
              <IconButton
                type="button"
                onClick={onOpenMoreOptions}
                className="btn btn-small"
                icon={<MoreIcon fontSize="small" />}
              />
            )}
            <IconButton
              type="button"
              onClick={onDelete}
              className="btn btn-small"
              icon={<DeleteIcon fontSize="small" />}
            />
          </div>
        </li>
      ))}
      <div className="dropdown-divider" />
      <button
        type="button"
        onClick={onAdd}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        style={{ color: "inherit" }}
      >
        {addLabel}
        <AddIcon fontSize="small" />
      </button>
    </ul>
  );
};

export default EditableList;
