import React, { useEffect, useState } from "react";
import SquadItem from "../components/SquadItem";
import { Container, ListGroup } from "react-bootstrap";

// SquadList component
function SquadList({ userState }) {
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    // Fetch user's squads data
    fetch(`/users/${userState.id}/squads`)
      .then((response) => response.json())
      .then((data) => {
        setSquads(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [userState.id]);

  return (
    <Container>
      <h3 className="text-center my-4">Squad List</h3>
      {squads && squads.length > 0 ? (
        <ListGroup>
          {squads.map((squad) => (
            <SquadItem key={squad.id} squad={squad} userState={userState} />
          ))}
        </ListGroup>
      ) : (
        <p>No squads found.</p>
      )}
    </Container>
  );
}

export default SquadList;
