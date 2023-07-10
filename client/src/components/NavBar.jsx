import React from 'react';

// NavBar component
function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/players">Players</a>
        </li>
        <li>
          <a href="/leagues">Leagues</a>
        </li>
        <li>
          <a href="/myfuthut">My FutHut</a>
        </li>
        <li>
          <a href="/signin">Sign In/Sign Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
