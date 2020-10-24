import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import DeleteIcon from "@material-ui/icons/Clear";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import IconButton from "./IconButton";

const EditableList = ({ items, onDelete, onAdd, addLabel, hasMoreOptions, onOpenMoreOptions, ...props }) => {
  return (
    <ListGroup variant="flush" {...props}>
      {items.map((item) => (
        <ListGroup.Item
          key={item}
          className="d-flex justify-content-between align-items-center"
          style={{ border: 0 }}
        >
          {item}
          <ButtonGroup>
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
          </ButtonGroup>
        </ListGroup.Item>
      ))}
      <ListGroup.Item
        action
        as="button"
        onClick={onAdd}
        className="d-flex justify-content-between align-items-center"
        style={{ color: "inherit", borderTop: !items.length && 0 }}
      >
        {addLabel}
        <AddIcon fontSize="small" />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default EditableList;
