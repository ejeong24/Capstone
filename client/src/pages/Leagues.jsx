import React, { useState } from 'react';
import LeagueList from '../components/LeagueList';
import PlayerList from '../components/PlayerList';

// Leagues component
function Leagues() {
  const [selectedLeague, setSelectedLeague] = useState(null);

  const handleLeagueClick = leagueId => {
    setSelectedLeague(leagueId);
  };

  return (
    <div>
      <h2>Leagues</h2>
      {selectedLeague ? (
        <PlayerList leagueId={selectedLeague} />
      ) : (
        <LeagueList handleLeagueClick={handleLeagueClick} />
      )}
    </div>
  );
}

export default Leagues;
