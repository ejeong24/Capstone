import React, { useState } from 'react';
import LeagueList from '../components/LeagueList';
import NavBar from '../components/NavBar';

// Leagues component
function Leagues() {
  return (
    <div>
      <NavBar />
      <h2>Leagues</h2>
      <LeagueList />
    </div>
  );
}

export default Leagues;
