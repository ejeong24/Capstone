import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Form, Collapse } from 'react-bootstrap';

function SquadItem({ squad, userState }) {
  const [editMode, setEditMode] = useState(false);
  const [newSquadName, setNewSquadName] = useState(squad.name || '');
  const [squadPlayers, setSquadPlayers] = useState([]);
  const [squads, setSquads] = useState([]);
  const [open, setOpen] = useState(false); // new state for Collapse

  useEffect(() => {
    fetch(`/squad_players/${squad.id}`)
      .then(response => response.json())
      .then(data => {
        setSquadPlayers(data);
        console.log(data);
        console.log(userState.id);

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
        window.location.reload(); // Reload the page after editing the squad name
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeleteSquad = () => {
    fetch(`/squads/${squad.id}/delete`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle deletion success here.
        window.location.reload(); // Reload the page after deleting the squad
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeletePlayer = playerId => {
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
        window.location.reload(); // Reload the page after deleting a player from the squad
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSetActiveSquad = () => {
    fetch(`/users/${userState.id}/squads/activeSquad`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        fetch(`/users/${userState.id}/squads/${squad.id}/setActive`, {
          method: 'POST',
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setSquads(data);
            window.location.reload(); // Reload the page after setting the squad as active
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Card className="mb-3 shadow" style={{ borderRadius: '15px' }}>
      <Card.Body>
        <Card.Title>{squad.name}</Card.Title>
        <Button variant="primary" onClick={handleSetActiveSquad}>
          Set as Active
        </Button>{' '}
        <Button variant="secondary" onClick={() => { setEditMode(true); setOpen(!open); }}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={handleDeleteSquad}>
          Delete
        </Button>

        <Collapse in={open}>
          <div>
            {!editMode ? null : (
              <>
                <Form.Control
                  type="text"
                  value={newSquadName}
                  onChange={e => setNewSquadName(e.target.value)}
                />
                <Button variant="success" onClick={handleEditSquad}>
                  Save
                </Button>{' '}
                <Button variant="secondary" onClick={() => { setEditMode(false); setOpen(!open); }}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </Collapse>

        <p>ID: {squad.id}</p>
        <h5>Squad Players:</h5>
        <ListGroup>
          {squadPlayers.map(squadPlayer => (
            <ListGroup.Item key={squadPlayer.id}>
              Player ID: {squadPlayer.player_id}, Player Name: {squadPlayer.playerName}{' '}
              <Button variant="danger" onClick={() => handleDeletePlayer(squadPlayer.player_id)}>
                Delete Player
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SquadItem;
