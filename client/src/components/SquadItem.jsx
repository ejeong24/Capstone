import React from 'react';

// SquadItem component
function SquadItem({ squad }) {
  return (
    <li>
      <h4>{squad.name}</h4>
      <p>{squad.id}</p>
    </li>
  );
}

export default SquadItem;