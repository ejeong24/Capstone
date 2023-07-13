import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// RegistrationForm component
function RegistrationForm() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const userId = uuidv4();
  
    // Prepare the request body with the form data
    const requestBody = JSON.stringify({
      ...formData,
      id: userId,
    });
  
    // Send the POST request to the server
    fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data); // You can do something with the response if needed
  
        // Reset form fields
        setFormData({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error if necessary
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;