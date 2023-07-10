import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Players from './pages/Players';
import Leagues from './pages/Leagues';
import MyFutHut from './pages/MyFutHut';

// Parent component
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/players">
          <Players />
        </Route>
        <Route path="/leagues">
          <Leagues />
        </Route>
        <Route path="/myfuthut">
          <MyFutHut />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
