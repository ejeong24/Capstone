import React, { useEffect, useState } from 'react';

function PlayerList({ handleAddToActiveSquad }) {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPlayers = (page) => {
      fetch(`/players?page=${page}`)
        .then(response => response.json())
        .then(data => {
          setPlayers(data.players);
          console.log(data.players);
          setTotalPages(data.pagination.pageTotal);
          fetchPlayerImages(data.players);
        })
        .catch(error => console.error(error));
    };

    const fetchPlayerImages = (players) => {
      players.forEach((player) => {
        fetch(`/players/${player.id}/image`)
          .then((response) => {
            if (response.ok) {
              return response.blob(); // Get the image data as a Blob
            } else {
              throw new Error('Image request failed');
            }
          })
          .then((blob) => {
            const imageURL = URL.createObjectURL(blob); // Create a URL for the image Blob
            setPlayers((prevPlayers) => {
              const updatedPlayers = prevPlayers.map((prevPlayer) => {
                if (prevPlayer.id === player.id) {
                  return { ...prevPlayer, image: imageURL };
                }
                return prevPlayer;
              });
              return updatedPlayers;
            });
          })
          .catch((error) => console.error(error));
      });
    };
    

    fetchPlayers(currentPage);
  }, [currentPage]);

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
            <img src={player.image} alt={player.id} />
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
