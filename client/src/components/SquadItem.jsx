import React, { useState, useEffect } from 'react';

function SquadItem({ squad , userState }) {
  const [editMode, setEditMode] = useState(false);
  const [newSquadName, setNewSquadName] = useState(squad.name || '');
  const [squadPlayers, setSquadPlayers] = useState([]);

  useEffect(() => {
    fetch(`/squad_players/${squad.id}`)
      .then(response => response.json())
      .then(data => {
        setSquadPlayers(data);

        const fetchPlayerNames = async () => {
          const playerNames = await Promise.all(
            data.map(squadPlayer =>
              fetch(`/players/${squadPlayer.player_id}`)
                .then(response => response.json())
                .then(playerData => playerData.player.name)
                .catch(error => {
                  console.error('Error:', error);
                  return ''; // Return an empty string in case of an error
                })
            )
          );
          setSquadPlayers(prevSquadPlayers =>
            prevSquadPlayers.map((squadPlayer, index) => ({
              ...squadPlayer,
              playerName: playerNames[index]
            }))
          );
        };

        fetchPlayerNames();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [squad.id]);


  const handleEditSquad = () => {
    fetch(`/squads/${squad.id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_squad_name: newSquadName }),
    })
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleDeleteSquad = () => {
    fetch(`/squads/${squad.id}/delete`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle deletion success here.
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleDeletePlayer = (playerId) => {
    fetch(`/users/squads/${squad.id}/delete-player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player_id: playerId }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <li>
      {!editMode ? (
        <>
          <h4>{squad.name}</h4>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDeleteSquad}>Delete</button>
        </>
      ) : (
        <>
          <input value={newSquadName} onChange={e => setNewSquadName(e.target.value)} />
          <button onClick={handleEditSquad}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      )}
      <p>ID: {squad.id}</p>
      <h5>Squad Players:</h5>
      <ul>
        {squadPlayers.map(squadPlayer => (
          <li key={squadPlayer.id}>
            Player ID: {squadPlayer.player_id}
            Player Name: {squadPlayer.playerName}
            <button onClick={() => handleDeletePlayer(squadPlayer.player_id)}>Delete Player</button>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default SquadItem;
