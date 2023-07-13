import React from 'react';
import Profile from '../components/Profile';
import ActiveSquad from '../components/ActiveSquad';
import SquadList from '../components/SquadList';
import NavBar from '../components/NavBar';

// MyFutHut component
function MyFutHut( {userState} ) {
    return (
      <div>
        <NavBar />
        <h2>My FutHut</h2>
        <Profile userState = {userState} />
        <ActiveSquad userState = {userState} />
        <SquadList />
      </div>
    );
  }

export default MyFutHut;