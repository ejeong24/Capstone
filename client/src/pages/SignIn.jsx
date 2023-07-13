import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';

// SignIn component
function SignIn() {
  const { updateUserState } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          const { id } = data.user; // Extract the id from the user object
          const updatedUserState = {
            id: id,
            username: username,
            signedIn: true
          };
          updateUserState(updatedUserState);
          console.log(updatedUserState);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <NavBar />
      <h3>Sign In</h3>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;