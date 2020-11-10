import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import CustomDropdownToggle from "../components/CustomDropdownToggle";
import { Actions } from "../redux/actions";
import EditableList from "./EditableList";
import PlanOptionForm from "./PlanOptionForm";

import "../scss/Dropdown.scss";

const BLACKLISTED_PAGES = ["/create-plan", "/templates"];

const PlanDropdown = ({ plans, selected, handleDelete, handleChangePlan, handleRenamePlan }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [optionModalProps, setOptionModalProps] = useState({ show: false });
  const items = Object.keys(plans);

  const handleOpenMoreOptions = (name) => {
    setOptionModalProps({
      show: true,
      plans,
      planName: name,
      onSubmit: (newName) => handleRenamePlan(name, newName),
      onClose: () => setOptionModalProps({ show: false }),
    });
  };

  const handleConditionalDelete = (name) => {
    if (window.confirm("Are you sure? Once deleted, this plan cannot be recovered.")) {
      handleDelete(name);
    }
  };

  const handleAdd = () => history.push("create-plan");

  if (!items.length || BLACKLISTED_PAGES.includes(pathname)) {
    return null;
  }

  return (
    <>
      <Container className="d-flex flex-row align-items-center selector-root">
        <span>You are viewing</span>
        <Dropdown navbar className="selector-dropdown custom-dropdown">
          <Dropdown.Toggle className="selector-dropdown-toggle" as={CustomDropdownToggle}>
            {selected}
            <KeyboardArrowDownIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <EditableList
              hasMoreOptions
              items={items}
              activeItem={selected}
              onClick={handleChangePlan}
              onDelete={handleConditionalDelete}
              onAdd={handleAdd}
              onOpenMoreOptions={handleOpenMoreOptions}
              addLabel={`Add a new plan`}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      <PlanOptionForm {...optionModalProps} />
    </>
  );
};

const mapStateToProps = (state) => ({
  selected: state.currentPlan,
  plans: state.plans,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangePlan: (name) => dispatch(Actions.changePlan(name)),
  handleDelete: (name) => dispatch(Actions.deletePlan(name)),
  handleRenamePlan: (prevName, newName) => dispatch(Actions.renamePlan(prevName, newName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanDropdown);
