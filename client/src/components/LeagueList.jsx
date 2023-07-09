import React, { useEffect, useState } from 'react';

// LeagueList component
function LeagueList() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch league data
    fetch('/api/leagues')
      .then(response => response.json())
      .then(data => setLeagues(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <ul>
      {leagues.map(league => (
        <li key={league.id}>
          <h3>{league.name}</h3>
          <PlayerList leagueId={league.id} />
        </li>
      ))}
    </ul>
  );
}
