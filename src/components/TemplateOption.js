import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Typography from "@material-ui/core/Typography";
import CollapseIcon from "@material-ui/icons/ExpandLess";
import ExpandIcon from "@material-ui/icons/ExpandMore";

const TemplateOption = ({ title, subtitle }) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey={title}
          onClick={() => setOpen(!open)}
          className="d-flex justify-content-between align-items-center"
          style={{ background: "white" }}
        >
          <div>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
          </div>
          <div>
            {open ? <CollapseIcon style={{ color: "grey" }} /> : <ExpandIcon style={{ color: "grey" }} />}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={title}>
          <Card.Body>plan here</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default TemplateOption;
