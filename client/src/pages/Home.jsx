import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import NavBar from '../components/NavBar';

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
