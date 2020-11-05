import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { Actions } from "../redux/actions";
import EditableList from "./EditableList";

import "../scss/Dropdown.scss";

const PlanDropdown = ({ plans, selected, handleDelete, handleChangePlan }) => {
  const history = useHistory();
  const items = Object.keys(plans).filter((plan) => plan !== selected);

  const handleOpenMoreOptions = () => console.log("more clicked");
  const handleAdd = () => history.push("create-plan");

  return (
    <Container className="d-flex flex-row align-items-center selector-root">
      <span>You are viewing</span>
      <Dropdown navbar className="selector-dropdown">
        <Dropdown.Toggle className="selector-dropdown-toggle">
          {selected}
          <KeyboardArrowDownIcon />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <EditableList
            hasMoreOptions
            items={items}
            onClick={handleChangePlan}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onOpenMoreOptions={handleOpenMoreOptions}
            addLabel={`Add a new plan`}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  selected: state.currentPlan,
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangePlan: (name) => dispatch(Actions.changePlan(name)),
  handleDelete: (name) => dispatch(Actions.deletePlan(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanDropdown);
