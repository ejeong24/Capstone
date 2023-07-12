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
        console.log(data);
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

  return (
    <div>
      <ul>
        {leagues && leagues.map((league, index) => (
          <li key={index}>
            {league.name}
            <button onClick={() => handleLeagueClick(league.id)}>View Players</button>
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


export default LeagueList;
