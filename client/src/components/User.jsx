import React, { useEffect, useState } from "react";

// User component
function User() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Simulating API call to fetch user data
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h3>User Details</h3>
      {Object.keys(user).length > 0 ? (
        <div>
          <p>Username: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>Platform: {user.platform}</p>
          <p>IGN: {user.ign}</p>
          <p>Bio: {user.bio}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
