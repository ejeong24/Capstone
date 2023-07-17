import React, { useEffect, useState } from 'react';

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
    <div>
      <ul>
        {players.map(player => (
          <div key={player.resourceId} className='player-card'>
            <div className='player-content'>
              <div className='player-image-container'>
                <div className='rarity-image' style={{ backgroundImage: `url(${player.rarity})` }}>
                  <div style={{ paddingBottom: '56.25%' }} />
                </div>
                <div className='player-image'>
                  {player.image && <img src={player.image} alt={player.name} />}
                </div>
              </div>
              <div className='player-details'>
                <h3>{player.name}</h3>
                <p>League: {player.league}</p>
                {/* <p>Rarity: {player.rarity}</p> */}
                <p>Rating: {player.rating}</p>
                <p>Rating Average: {player.ratingAverage}</p>
                <p>Pace: {player.pace}</p>
                <p>Shooting: {player.shooting}</p>
                <p>Passing: {player.passing}</p>
                <p>Dribbling: {player.dribbling}</p>
                <p>Defending: {player.defending}</p>
                <p>Physicality: {player.physicality}</p>
              </div>
            </div>
            <button className='add-squad-button' onClick={() => handleAddToActiveSquad(player.id)}>Add to Active Squad</button>
          </div>
        ))}
      </ul>
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
