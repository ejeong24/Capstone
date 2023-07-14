import React, { useEffect, useState } from 'react';
import SquadItem from '../components/SquadItem';

// SquadList component
function SquadList({ userState }) {
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    // Fetch user's squads data
    fetch(`/users/${userState.id}/squads`)
      .then(response => response.json())
      .then(data => {
        setSquads(data)
        console.log(data)
      })
      .catch(error => console.error(error));
  }, [userState.id]);

  return (
    <div>
      <h3>Squad List</h3>
      {squads && squads.length > 0 ? (
        <ul>
          {squads.map(squad => (
            <SquadItem key={squad.id} squad={squad} userState={userState}/>
          ))}
        </ul>
      ) : (
        <p>No squads found.</p>
      )}
    </div>
  );
}

export default SquadList;
