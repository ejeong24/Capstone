import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Players from './pages/Players';
import Leagues from './pages/Leagues';
import MyFutHut from './pages/MyFutHut';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



// Parent component
function App() {
  const [userState, setUserState] = useState([]);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home userState={userState}/>
        </Route>
        <Route path="/players">
          <Players userState={userState}/>
        </Route>
        <Route path="/leagues">
          <Leagues userState={userState}/>
        </Route>
        <Route path="/myfuthut">
          <MyFutHut userState={userState}/>
        </Route>
        <Route path="/signin">
          <SignIn userState={userState} setUserState={setUserState}/>
        </Route>
        <Route path="/signout" userState={userState} setUserState={setUserState}>
          <SignOut />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
