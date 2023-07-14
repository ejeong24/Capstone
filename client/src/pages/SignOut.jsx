import React, { useContext } from 'react';
import NavBar from '../components/NavBar'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// SignOut component
function SignOut() {
  const { updateUserState } = useContext(UserContext);
  const history = useHistory();

  const handleSignOut = () => {
    fetch('/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.message === 'User signed out successfully') {
          const updatedUserState = {
            id: null,
            username: '',
            signedIn: false
          };
          updateUserState(updatedUserState);
          history.push('/');
          console.log('User signed out');
          alert('Thanks for visiting! You have been signed out');
        } else {
          throw new Error('Failed to sign out');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <NavBar />
      <h3>Sign Out</h3>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
