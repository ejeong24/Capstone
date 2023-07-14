import React, { useEffect, useState, useContext } from 'react';

// import your UserContext here
import { UserContext } from '../contexts/UserContext';

// Profile component
function Profile() {
  const { userState, setUserState } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(userState);
  const [squads, setSquads] = useState([]);
  // const [activeSquad, setActiveSquad] = useState(null);
  // const [newSquadName, setNewSquadName] = useState('');

  useEffect(() => {
    // Assuming you are fetching user's profile from backend
    fetch(`/users/${userState.id}/profile`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUserProfile(data);
        // setUserState(data);  // Updating userState with the fetched profile
      })
      .catch(error => console.error(error));
  
    fetch(`/users/${userState.id}/squads`)
      .then(response => response.json())
      .then(data => {
        setSquads(data);
        console.log(squads);
      })
      .catch(error => console.error(error));
  }, []);

  // other code here...

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    fetch(`/users/${userState.id}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userProfile)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserState(userProfile);  // Updating the userState with updated profile
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h3>User Profile</h3>
      <p>Username: {userState.username}</p>
      <form onSubmit={handleProfileSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={userProfile.firstName} onChange={handleProfileChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={userProfile.lastName} onChange={handleProfileChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userProfile.email} onChange={handleProfileChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
