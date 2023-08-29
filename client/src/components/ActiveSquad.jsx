import React, { useEffect, useState } from "react";
import SquadItem from "../components/SquadItem";
import { Container, Card } from "react-bootstrap";

// ActiveSquad component
function ActiveSquad({ userState }) {
  const [activeSquad, setActiveSquad] = useState(null); // state to store active squad data from API

  useEffect(() => {
    // Simulating API call to fetch active squad data
    fetch(`/users/${userState.id}/squads/activeSquad`)
      .then((response) => response.json())
      .then((data) => setActiveSquad(data))
      .catch((error) => console.error(error));
  }, [userState.id]);

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Active Squad</h3>
      {activeSquad ? (
        <Card className="mb-3 shadow" style={{ borderRadius: "15px" }}>
          <Card.Body>
            <SquadItem squad={activeSquad} userState={userState} />
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center mt-5">Loading active squad data...</p>
      )}
    </Container>
  );
}

export default ActiveSquad;
