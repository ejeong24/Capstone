import React, { useEffect, useState } from 'react';

// PlayerById component
function PlayerById({ playerId }) {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    // Simulating API call to fetch player data based on playerId
    fetch(`/api/players/${playerId}`)
      .then(response => response.json())
      .then(data => setPlayer(data))
      .catch(error => console.error(error));
  }, [playerId]);

  return (
    <div>
      <h3>Player Details</h3>
      {Object.keys(player).length > 0 ? (
        <div>
          <p>Name: {player.name}</p>
          <p>Position: {player.position}</p>
          <p>Club: {player.club}</p>
          {/* Add more player details as needed */}
        </div>
      ) : (
        <p>Loading player data...</p>
      )}
    </div>
  );
}

export default PlayerById;
