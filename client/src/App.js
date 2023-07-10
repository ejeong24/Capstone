import React, { useState } from 'react';
import SignIn from './SignIn';
import SignOut from './SignOut';

// Parent component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <h1>My App</h1>
      </header>
      <main>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, User!</h2>
            <SignOut handleLogout={handleLogout} />
          </div>
        ) : (
          <div>
            <h2>Please sign in:</h2>
            <SignIn handleLogin={handleLogin} />
          </div>
        )}
      </main>
      <footer>
        <p>© 2023 FutHut. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
