import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function PlayerList({ userState, handleAddToActiveSquad }) {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPlayers(currentPage);
  }, [currentPage]);

  const fetchPlayers = (page) => {
    fetch(`/players?page=${page}`)
      .then(response => response.json())
      .then(data => {
        console.log(userState);
        console.log(data.players);
        setPlayers(data.players);
        setTotalPages(data.pagination.pageTotal);
        fetchPlayerImages(data.players);
        fetchCardBackgrounds(data.players);
      })
      .catch(error => console.error(error));
  };

  const fetchPlayerImages = (players) => {
    players.forEach(player => {
      fetch(`/players/${player.id}/image`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setPlayers(prevPlayers => {
            const updatedPlayers = prevPlayers.map(prevPlayer => {
              if (prevPlayer.id === player.id) {
                return { ...prevPlayer, image: imageUrl };
              }
              return prevPlayer;
            });
            return updatedPlayers;
          });
        })
        .catch(error => console.error(error));
    });
  };

  const fetchCardBackgrounds = (players) => {
    players.forEach(player => {
      fetch(`rarities/${player.rarity}/image`)
        .then(response => response.blob())
        .then(backgroundBlob => {
          const backgroundUrl = URL.createObjectURL(backgroundBlob);
          setPlayers(prevPlayers => {
            const updatedPlayers = prevPlayers.map(prevPlayer => {
              if (prevPlayer.id === player.id) {
                return { ...prevPlayer, rarity: backgroundUrl };
              }
              return prevPlayer;
            });
            return updatedPlayers;
          });
        })
        .catch(error => console.error(error));
    });
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {players.map(player => (
          <Card key={player.resourceId} className='player-card' style={{ marginBottom: '1rem' }}>
            <Card.Header>{player.name}</Card.Header>
            <Card.Body className='player-content' style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='player-image-container' style={{ 
                backgroundImage: `url(${player.rarity})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '18rem' }}>
                <Card.Img variant="top" src={player.image} alt={player.name} style={{
                  maxWidth: '70%',
                  maxHeight: '70%',
                  objectFit: 'contain',
                }}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, marginLeft: '1rem'}}>
                <Card.Text style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1, flexWrap: 'wrap'}}>
                  <p style={{display: 'inline', margin: '0 1rem'}}>League: {player.league}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Rating: {player.rating}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Rating Average: {player.ratingAverage}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Pace: {player.pace}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Shooting: {player.shooting}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Passing: {player.passing}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Dribbling: {player.dribbling}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Defending: {player.defending}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Physicality: {player.physicality}</p> |
                  <p style={{display: 'inline', margin: '0 1rem'}}>Position: {player.position}</p>
                </Card.Text>
                <Button variant="success" className='add-squad-button' onClick={() => handleAddToActiveSquad(player.id)} style={{ marginTop: '1rem', alignSelf: 'flex-end' }}>
                  Add to Active Squad
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
}

export default PlayerList;
