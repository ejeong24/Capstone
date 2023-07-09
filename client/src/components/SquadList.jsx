import React, { useEffect, useState } from 'react';

// SquadList component
function SquadList() {
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch user's squads data
    fetch('/api/squads')
      .then(response => response.json())
      .then(data => setSquads(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h3>Squad List</h3>
      {squads.length > 0 ? (
        <ul>
          {squads.map(squad => (
            <SquadItem key={squad.id} squad={squad} />
          ))}
        </ul>
      ) : (
        <p>No squads found.</p>
      )}
    </div>
  );
}

export default SquadList;