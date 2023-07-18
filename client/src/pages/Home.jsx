import React, { useContext } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import NavBar from '../components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../contexts/UserContext';

// Home component
function Home() {
  const { userState } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <div className="jumbotron">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              {userState.id != null ? (
                <h1>Welcome back, {userState.username}!</h1>
              ) : (
                <>
                  <h1>Welcome to FutHut</h1>
                  <RegistrationForm />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
