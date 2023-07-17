import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Container, Form, Button, Collapse } from 'react-bootstrap';

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
  const [open, setOpen] = useState(false);

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
    <Container>
      <h3 className="text-center my-4">User Profile</h3>
      <p>Username: {userProfile.username}</p>
      <p>First Name: {userProfile.firstName}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Email: {userProfile.email}</p>

      <h3 className="text-center my-4">Edit Profile</h3>
      <Button 
        onClick={() => setOpen(!open)} 
        aria-controls="edit-profile-form" 
        aria-expanded={open}
      >
        {open ? 'Hide Edit Profile Form' : 'Show Edit Profile Form'}
      </Button>

      <Collapse in={open}>
        <div id="edit-profile-form">
          <Form onSubmit={handleProfileSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={userProfile.username} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={userProfile.firstName} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={userProfile.lastName} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={userProfile.email} onChange={handleProfileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Update Profile</Button>
          </Form>
        </div>
      </Collapse>
    </Container>
  );
}

export default Profile;