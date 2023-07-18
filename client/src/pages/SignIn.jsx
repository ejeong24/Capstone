import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// SignIn component
function SignIn() {
  const history = useHistory();
  const { updateUserState } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signInSuccess, setSignInSuccess] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          const { id } = data.user;
          const updatedUserState = {
            id: id,
            username: username,
            signedIn: true
          };
          updateUserState(updatedUserState);
          setSignInSuccess(true);
          setUsername('');
          setPassword('');
          setTimeout(() => {
            setSignInSuccess(false);
            history.push('/myfuthut'); // Redirect to home page
          }, 2000);
        } else {
          setSignInError('Invalid username or password');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="jumbotron">
      <NavBar />
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
          <Col xs={12} sm={8} md={6}>
            <h3 className="text-center">Sign In</h3>
            {signInSuccess && (
              <Alert variant="success" className="my-3">
                You have signed in successfully!
              </Alert>
            )}
            {signInError && (
              <Alert variant="danger" className="my-3">
                {signInError}
              </Alert>
            )}
            <Form onSubmit={handleSignIn} className="form-background">
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
