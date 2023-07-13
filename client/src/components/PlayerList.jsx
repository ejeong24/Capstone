import React, { useEffect, useState } from 'react';

function PlayerList() {
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
        setPlayers(data.players);
        console.log(data.players);
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

  const handleAddToActiveSquad = (playerId) => {
    // Perform logic to add the player to the active squad
    console.log('Adding player to active squad:', playerId);
  };

  return (
    <div>
      <ul>
        {players.map(player => (
          <li key={player.resourceId}>
            {player.name}
            <button onClick={() => handleAddToActiveSquad(player)}>Add to Active Squad</button>
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
