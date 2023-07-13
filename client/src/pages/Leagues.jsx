import React, { useState, useEffect } from 'react';
import LeagueList from '../components/LeagueList';
import NavBar from '../components/NavBar';

// Leagues component
function Leagues() {
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
      <h2>Leagues</h2>
      <LeagueList handleLeagueClick={handleLeagueClick} />
      <h2>Players</h2>
      {players && players.map((player, index) => (
        <div key={index}>
          <h4>{player.name}</h4>
        </div>
      ))}
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Leagues;
