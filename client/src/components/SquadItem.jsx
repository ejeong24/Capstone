import React, { useState } from 'react';

function SquadItem({ squad }) {
  const [editMode, setEditMode] = useState(false);
  const [newSquadName, setNewSquadName] = useState(squad.name || '');

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
    </li>
  );
}

export default SquadItem;