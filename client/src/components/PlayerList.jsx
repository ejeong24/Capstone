import React, { useEffect, useState } from 'react';

function PlayerList({ handleAddToActiveSquad }) {
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
        console.log(data.players)
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
          <li key={player.resourceId}>
            {player.name}
            {player.image && <img src={player.image} alt={player.name} />}
            {player.rarity && <img src={player.rarity} alt={player.name} />}
            <button onClick={() => handleAddToActiveSquad(player.id)}>Add to Active Squad</button>
          </li>
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
