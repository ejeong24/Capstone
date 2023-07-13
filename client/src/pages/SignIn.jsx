import React, { useState } from 'react';
import NavBar from '../components/NavBar';

// SignIn component
function SignIn({ userState, setUserState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform sign in logic with the username and password
    console.log('Signing in with username:', username);
    console.log('Signing in with password:', password);
    setUserState({
      username: username,
      signedIn: true
    });
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
      {userState && (
        <div>
          <p>Welcome, {userState.username}!</p>
          <p>You are signed in.</p>
        </div>
      )}
    </div>
  );
}


export default SignIn;
