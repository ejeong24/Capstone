import React, { useState } from 'react';
import LeagueList from '../components/LeagueList';
import NavBar from '../components/NavBar';

// Leagues component
function Leagues() {
  const [players, setPlayers] = useState([]);
  
  const handleLeagueClick = (leagueId) => {
    fetch('/players/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        league: leagueId
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch players: ' + response.status);
        }
      })
      .then(data => {
        console.log(data); // Debug: log the data
        setPlayers(data.players); // Note the change here to match the response format
      })
      .catch(error => {
        console.error('Failed to fetch players:', error);
      });
  };
  

  return (
    <div>
      <NavBar />
      <h2>Leagues</h2>
      <LeagueList handleLeagueClick={handleLeagueClick} />
      <h2>Players</h2>
      {console.log(players)} {/* Debugging line */}
      {players && players.map((player, index) => (
        <div key={index}>
          <h4>{player.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Leagues;
