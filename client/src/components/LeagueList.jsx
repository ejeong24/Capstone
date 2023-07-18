import React, { useEffect, useState } from 'react';

// LeagueList component
function LeagueList({ handleLeagueClick }) {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchLeagues(currentPage);
  }, [currentPage]);

  const fetchLeagues = (page) => {
    fetch(`/leagues?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setLeagues(data.leagues);
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

  const leagueListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: '10px',
    listStyle: 'none',
    padding: 0,
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const paginationButtonStyle = {
    margin: '10px 5px',
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <ul style={leagueListStyle}>
        {leagues && leagues.map((league, index) => (
          <li key={index} style={listItemStyle}>
            {league.name}
            <button onClick={() => handleLeagueClick(league.id)} style={buttonStyle}>View Players</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} style={paginationButtonStyle}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} style={paginationButtonStyle}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default LeagueList;
