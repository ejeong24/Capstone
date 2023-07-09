import React from 'react';
import RegistrationForm from './RegistrationForm';
import NavBar from './NavBar';

// Home component
function Home() {
  return (
    <div>
      <NavBar />
      <h1>Welcome to FutHut</h1>
      <RegistrationForm />
    </div>
  );
}

export default Home;
