import React from "react";
import Card from "react-bootstrap/Card";

function Mod(props) {
    const modData = props.modData;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{modData.code}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{modData.mcs} MCs</Card.Subtitle>
                <Card.Text>
                    {modData.name}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Mod;