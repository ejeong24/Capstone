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

    // Fetch the user's squads
    fetch(`/users/${userState.id}/squads`)
      .then(response => response.json())
      .then(data => {

        const squads = data;
        console.log(data);

        if (squads.length === 0) {
          console.log('No squads found for the user.');
          return;
        }

        // Add the player to the first squad
        const squadId = data[0]['id'];

        fetch(`/users/${userState.id}/squads/${squadId}/add-player`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: playerId,
          })
        })
          .then(response => {
            if (response.ok) {
              console.log('Player added to squad successfully.');
            } else {
              console.error('Error adding player to squad.');
            }
          })
          .catch(error => {
            console.error('Error adding player to squad:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user squads:', error);
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
