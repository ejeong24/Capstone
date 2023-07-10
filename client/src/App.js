import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Players from './pages/Players';
import Leagues from './pages/Leagues';
import MyFutHut from './pages/MyFutHut';
import SignIn from './pages/SignIn';

// NavBar component
function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/leagues">Leagues</Link>
        </li>
        <li>
          <Link to="/myfuthut">My FutHut</Link>
        </li>
        <li>
          <Link to="/signin">Sign In/Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/leagues" component={Leagues} />
          <Route path="/myfuthut" component={MyFutHut} />
          <Route path="/signin" component={SignIn} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
