import React from 'react';

// SignOut component
function SignOut() {
  const handleSignOut = () => {
    // Perform sign out logic
    // ...

    // Simulating successful sign-out
    console.log('User signed out');
    alert('Thanks for visiting! You have been signed out');
  };

  return (
    <div>
      <h3>Sign Out</h3>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
