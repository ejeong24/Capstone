import React from 'react';
import Home from './pages/Home';

// Parent component
function App() {
  return (
    <div>
      <header>
        <h1>My App</h1>
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <p>© 2023 FutHut. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
