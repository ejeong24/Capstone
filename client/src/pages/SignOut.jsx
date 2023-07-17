import React, { useContext } from 'react';
import NavBar from '../components/NavBar'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// SignOut component
function SignOut() {
  const { updateUserState } = useContext(UserContext);
  const history = useHistory();

  const handleSignOut = (event) => {
    event.preventDefault();
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
    <div className="jumbotron">
      <NavBar />
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
          <Col xs={12} sm={8} md={6}>
            <h3 className="text-center">Sign Out</h3>
            <Form onSubmit={handleSignOut} className="form-background">
              <Button variant="primary" type="submit" className="w-100">
                Confirm Sign Out
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignOut;
