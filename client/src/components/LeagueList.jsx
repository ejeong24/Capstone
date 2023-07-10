import React, { useEffect, useState } from 'react';

// LeagueList component
function LeagueList({ handleLeagueClick }) {
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
          {league.name}
          <button onClick={() => handleLeagueClick(league.id)}>View Players</button>
        </li>
      ))}
    </ul>
  );
}

export default LeagueList;
