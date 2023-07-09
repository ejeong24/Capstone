import React, { useEffect, useState } from 'react';

// PlayerItem component
function PlayerItem({ player }) {
  return (
    <li>
      <h3>{player.name}</h3>
      <p>Position: {player.position}</p>
      <p>Club: {player.club}</p>
      <p>Country: {player.country}</p>
    </li>
  );
}

export default PlayerItem;
