import React, { useState } from "react";

// PlayerItem component
function PlayerItem({ player }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToActiveSquad = () => {
    // Perform logic to add the player to the user's active squad
    // Here, we're simply toggling the `isAdded` state to simulate the addition
    setIsAdded(true);
  };

  return (
    <li>
      <h3>{player.name}</h3>
      <p>Position: {player.position}</p>
      <p>Club: {player.club}</p>
      <p>Country: {player.country}</p>
      {isAdded ? (
        <p>Player added to Active Squad</p>
      ) : (
        <button onClick={handleAddToActiveSquad}>Add to Active Squad</button>
      )}
    </li>
  );
}

export default PlayerItem;
