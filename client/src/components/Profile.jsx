import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

// Profile component
function Profile({ userState }) {
  const [squads, setSquads] = useState([]);
  const { setUserState } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  // const [activeSquad, setActiveSquad] = useState(null);
  const [newSquadName, setNewSquadName] = useState('');

  useEffect(() => {
    // Simulating API call to fetch user profile data
    fetch(`/users/${userState.id}/profile`)
      .then(response => response.json())
      .then(data => {
        // Assuming the received data is an object with properties name, platform, ign, and bio
        setUserProfile(data);
      })
      .catch(error => console.error(error));
  
    // Simulating API call to fetch user's squads data
    fetch(`/users/${userState.id}/squads`)
      .then(response => response.json())
      .then(data => {
        // Assuming the received data is an array of squad objects
        setSquads(data);
      })
      .catch(error => console.error(error));
  }, [userState.id]);

  // const handleSetActiveSquad = squadId => {
  //   const selectedSquad = squads.find(squad => squad.id === squadId);
  //   setActiveSquad(selectedSquad);
  //   // Perform logic to set the selected squad as the active squad
  //   console.log('Setting squad as active squad:', selectedSquad);
  // };

  // const handleSetActiveSquad = squadId => {
  //   const selectedSquad = squads.find(squad => squad.id === squadId);
  //   setActiveSquad(selectedSquad);
  //   // Perform logic to set the selected squad as the active squad
  //   console.log('Setting squad as active squad:', selectedSquad);
  // };

  // const handleRenameSquad = squadId => {
  //   const renamedSquad = squads.find(squad => squad.id === squadId);
  //   // Perform logic to rename the squad
  //   console.log('Renaming squad:', renamedSquad);
  // };

  // const handleDeleteSquad = squadId => {
  //   const deletedSquad = squads.find(squad => squad.id === squadId);
  //   // Perform logic to delete the squad
  //   console.log('Deleting squad:', deletedSquad);
  // };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleCreateSquad = event => {
    event.preventDefault();
  
    // Prepare the data for the API request
    const data = {
      squad_name: newSquadName,
      user_id: userState.id // Replace "userID" with the appropriate property of your userState object
    };
  
    // Send the API request to create a new squad
    fetch('/squads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // Handle the response from the API as needed
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occur during the API request
      });
  
    setNewSquadName('');
  };
  
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
      <p>Name: {userProfile.name}</p>
      <p>Platform: {userProfile.platform}</p>
      <p>In-Game Username: {userProfile.ign}</p>
      <p>Bio: {userProfile.bio}</p>

      {/* <h3>My Squads</h3>
      <ul>
        {squads.map(squad => (
          <li key={squad.id}>
            {squad.name}
            <button onClick={() => handleSetActiveSquad(squad.id)}>Set as Active Squad</button>
            {activeSquad && activeSquad.id === squad.id && (
              <div>
                <h4>Active Squad</h4>
                <p>Name: {activeSquad.name}</p>
                <button onClick={() => handleRenameSquad(activeSquad.id)}>Rename Squad</button>
                <button onClick={() => handleDeleteSquad(activeSquad.id)}>Delete Squad</button>
              </div>
            )}
          </li>
        ))}
      </ul> */}

      <h3>Profile Form</h3>
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

      <h3>Create New Squad</h3>
      <form onSubmit={handleCreateSquad}>
        <input
          type="text"
          placeholder="Enter squad name"
          value={newSquadName}
          onChange={event => setNewSquadName(event.target.value)}
        />
        <button type="submit">Create Squad</button>
      </form>

    </div>
  );
}

export default Profile;