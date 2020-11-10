import React from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/actions";
import Button from "react-bootstrap/Button";
import Add from "@material-ui/icons/Add";
import "../../css/dashboard/AddSemButton.css";

function AddSemButton({semName, currentPlan, handleEditPlan}) {
    const handleAddSem = (event) => {
        const sem = { name: semName, mods: [] };
        handleEditPlan({
            ...currentPlan,
            sems: { ...currentPlan.sems, [semName]: sem },
        });
    };
    
    return (
        <Button className="add-sem-button rounded-0" onClick={handleAddSem}>
            <Add /><span>Add {semName}</span>
        </Button>
    );
}

const mapStateToProps = (state) => ({
    currentPlan: state.plans[state.currentPlan],
});

const mapDispatchToProps = (dispatch) => ({
    handleEditPlan: (plan) => dispatch(Actions.editPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSemButton);