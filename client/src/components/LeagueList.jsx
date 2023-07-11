import React, { useEffect, useState } from 'react';

// LeagueList component
function LeagueList({ handleLeagueClick }) {
  const [leagues, setLeagues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLeagues();
  }, [page]);

  const fetchLeagues = () => {
    fetch(`https://futdb.app/api/leagues?page=${page}`)
      .then(response => response.json())
      .then(data => setLeagues(data))
      .catch(error => console.error(error));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <ul>
        {leagues.map(league => (
          <li key={league.id}>
            {league.name}
            <button onClick={() => handleLeagueClick(league.id)}>View Players</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}

export default LeagueList;
