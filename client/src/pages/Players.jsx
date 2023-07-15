import React, { useContext } from 'react';
import PlayerList from '../components/PlayerList';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';

// Players component
function Players() {
  const { userState } = useContext(UserContext);
  
  const handleAddToActiveSquad = (playerId) => {
    // Perform logic to add the player to the active squad
    console.log('Adding player to active squad:', playerId);
  
    // Fetch the active squad for the user
    fetch(`/users/${userState.id}/squads/activeSquad`)
      .then((response) => response.json())
      .then((data) => {
        const activeSquadId = data.id;
  
        if (activeSquadId) {
          // Add the player to the active squad
          fetch(`/users/${userState.id}/squads/${activeSquadId}/add-player`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              player_id: playerId,
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Player added to active squad successfully.');
              } else {
                console.error('Error adding player to active squad.');
              }
            })
            .catch((error) => {
              console.error('Error adding player to active squad:', error);
            });
        } else {
          console.log('No active squad found for the user.');
        }
      })
      .catch((error) => {
        console.error('Error fetching active squad:', error);
      });
  };
  

  return (
    <div>
      <NavBar />
      <h2>Players</h2>
      {userState && <PlayerList userState={userState} handleAddToActiveSquad={handleAddToActiveSquad} />}
    </div>
  );
}

export default Players;
