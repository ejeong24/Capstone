import React, { useState, useEffect } from 'react';
import LeagueList from '../components/LeagueList';
import NavBar from '../components/NavBar';
import { Container, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

// Leagues component
function Leagues() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, .15)', // white with 70% opacity
    borderRadius: '15px',
    padding: '20px',
    minHeight: '100vh', // Adjust the minimum height to fill the entire viewport
  };

  useEffect(() => {
    fetchPlayers(currentPage);
  }, [currentPage]);

  const fetchPlayers = (page) => {
    fetch(`/players?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.players);
        setTotalPages(data.pagination.pageTotal);
      })
      .catch(error => console.error(error));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleLeagueClick = (leagueId) => {
    fetch('/players/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-AUTH-TOKEN': 'e0218f1b-c550-4938-a8d5-e309e6dc02b7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        league: leagueId
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch players: ' + response.status);
        }
      })
      .then(data => {
        setPlayers(data.players);
        console.log(data)
      })
      .catch(error => {
        console.error('Failed to fetch players:', error);
      });
  };

  return (
    <div>
      <NavBar />
      <Container fluid style={containerStyle}>
        <h2>Leagues</h2>
        <Row className="mb-3">
          <LeagueList handleLeagueClick={handleLeagueClick} />
        </Row>
        <h2>Players</h2>
        <Row>
          {players && players.map((player, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Card.Title>{player.name}</Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="mr-2">
              Previous Page
            </Button>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next Page
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leagues;
