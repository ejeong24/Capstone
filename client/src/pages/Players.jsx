import React from 'react';
import PlayerList from '../components/PlayerList';
import NavBar from '../components/NavBar';

// Players component
function Players() {
  return (
    <div>
      <NavBar />
      <h2>Players</h2>
      <PlayerList />
    </div>
  );
}

export default Players;
