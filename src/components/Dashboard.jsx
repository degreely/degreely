import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sem from "./Sem";

import { sems, mods } from "../data/dashboard-data";

const DEFAULT_SET_UP = {
    sems: {
        ...sems,
        Y1S1: {
            ...sems.Y1S1,
            mods: mods,
        },
    },
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_SET_UP;
    }

    render() {
        return (
            <Container>
                <Row>
                    {Object.entries(this.state.sems).map(([key, semData]) => {
                        return <Col><Sem key={key} semData={semData} /></Col>;
                    })}
                </Row>
            </Container>
        );
    }
}

export default Dashboard;