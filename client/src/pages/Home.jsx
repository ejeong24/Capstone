import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import NavBar from '../components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Home component
function Home() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="jumbotron">
              <h1>Welcome to FutHut</h1>
              <RegistrationForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
