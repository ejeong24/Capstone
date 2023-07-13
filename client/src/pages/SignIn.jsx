import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';
// import { useRouteId } from 'react-router/dist/lib/hooks';
// import { useHistory } from 'react-router-dom';

// SignIn component
function SignIn() {
  const { updateUserState } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform sign in logic with the username and password
    // Assuming you make a POST request to your backend API to authenticate the user
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Assuming the API response includes the user's id
        const userId = data.userId;
  
        const updatedUserState = {
          id: userId, // Include the id in the updatedUserState
          username: username,
          signedIn: true
        };
  
        updateUserState(updatedUserState);
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
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignIn;

