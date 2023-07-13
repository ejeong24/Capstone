import React, { useContext } from 'react';
import Profile from '../components/Profile';
import ActiveSquad from '../components/ActiveSquad';
import SquadList from '../components/SquadList';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';

// MyFutHut component
function MyFutHut() {
  const { userState } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <h2>My FutHut</h2>
      {userState && <Profile userState={userState} />}
      {userState && <ActiveSquad userState={userState} />}
      {userState && <SquadList userState={userState} />}
    </div>
  );
}

export default MyFutHut;