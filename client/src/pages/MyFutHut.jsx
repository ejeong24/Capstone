import React, { useContext } from 'react';
import Profile from '../components/Profile';
import ActiveSquad from '../components/ActiveSquad';
import SquadList from '../components/SquadList';
import NavBar from '../components/NavBar';
import { UserContext } from '../contexts/UserContext';
import { Container, Row, Col } from 'react-bootstrap';

// MyFutHut component
function MyFutHut() {
  const { userState } = useContext(UserContext);

  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, .15)', // white with 70% opacity
    borderRadius: '15px',
    padding: '20px',
    width: '100%'
  };

  const rootStyle = {
    margin: 0, // Remove default margin
    padding: 0, // Remove default padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div style={rootStyle}>
      <NavBar />
      <div style={containerStyle}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h2 className="text-center my-4">My FutHut</h2>
            </Col>
          </Row>
          {userState && (
            <Row>
              <Col xs={12} md={4}>
                <Profile userState={userState} />
              </Col>
              <Col xs={12} md={8}>
                <ActiveSquad userState={userState} />
                <SquadList userState={userState} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default MyFutHut;
