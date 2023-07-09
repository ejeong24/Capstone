import React, { useEffect, useState } from 'react';

// SquadItem component
function SquadItem({ squad }) {
  return (
    <li>
      <h4>{squad.name}</h4>
      <p>{/* Add more squad details as needed */}</p>
    </li>
  );
}
