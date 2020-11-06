import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

const ReadOnlyList = ({ items, onDelete, onAdd, addLabel, hasMoreOptions, onOpenMoreOptions, ...props }) => {
  if (items.length) {
    return (
      <ListGroup variant="flush" {...props}>
        {items.map((item) => (
          <ListGroup.Item
            key={item}
            className="d-flex justify-content-between align-items-center"
            style={{ border: 0, padding: "0.375rem 1.25rem" }}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else {
    return (
      <ListGroup variant="flush" {...props}>
        <ListGroup.Item
          key="-"
          className="d-flex justify-content-between align-items-center"
          style={{ border: 0, padding: "0.375rem 1.25rem" }}
        >
          -
        </ListGroup.Item>
      </ListGroup>
    );
  }
};

export default ReadOnlyList;
