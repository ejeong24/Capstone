import React, { useEffect, useState } from 'react';

// PlayerList component
function PlayerList({ leagueId }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch player data for a specific league
    fetch(`/api/leagues/${leagueId}/players`)
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error(error));
  }, [leagueId]);

  return (
    <ul>
      {players.map(player => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  );
}

export default LeagueList;