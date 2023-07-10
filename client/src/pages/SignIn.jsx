import React, { useState } from 'react';

// SignIn component
function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform sign in logic with the username and password
    console.log('Signing in with username:', username);
    console.log('Signing in with password:', password);
    // ...
  };

  return (
    <div>
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
