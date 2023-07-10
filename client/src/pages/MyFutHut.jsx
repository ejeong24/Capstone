import React from 'react';
import Profile from '../components/Profile';
import ActiveSquad from '../components/ActiveSquad';
import SquadList from '../components/SquadList';
import NavBar from '../components/NavBar';

// MyFutHut component
function MyFutHut() {
    return (
      <div>
        <NavBar />
        <h2>My FutHut</h2>
        <Profile />
        <ActiveSquad />
        <SquadList />
      </div>
    );
  }

export default MyFutHut;