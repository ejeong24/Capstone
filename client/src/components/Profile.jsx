import React, { useEffect, useState } from 'react';

// Profile component
function Profile() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // Simulating API call to fetch user profile data
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setUserProfile(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h3>User Profile</h3>
      <p>Name: {userProfile.name}</p>
      <p>Platform: {userProfile.platform}</p>
      <p>In-Game Username: {userProfile.ign}</p>
      <p>Bio: {userProfile.bio}</p>
    </div>
  );
}

export default Profile;
