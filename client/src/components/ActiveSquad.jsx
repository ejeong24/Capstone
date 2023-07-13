import React, { useEffect, useState } from 'react';
import SquadItem from '../components/SquadItem';

// ActiveSquad component
function ActiveSquad({ userState }) {
  const [activeSquad, setActiveSquad] = useState({}); // state to store active squad data from API

  useEffect(() => {
    // Simulating API call to fetch active squad data
    fetch('/api/activeSquad')
      .then(response => response.json())
      .then(data => setActiveSquad(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h3>Active Squad</h3>
      {activeSquad ? (
        <SquadItem squad={activeSquad} />
      ) : (
        <p>Loading active squad data...</p>
      )}
    </div>
  );
}

export default ActiveSquad;