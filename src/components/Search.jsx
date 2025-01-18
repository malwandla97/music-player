// src/components/Search.jsx

import React, { useState } from 'react';
import { searchTracks } from '../spotifyService';

const Search = ({ onTrackSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const tracks = await searchTracks(query);
      setResults(tracks);
    } catch (error) {
      console.error('Error searching tracks:', error.message);
    }
  };

  return (
    <div className="search-component p-4 bg-gray-800 text-white rounded-lg">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song..."
          className="p-2 rounded w-full text-black"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      <ul>
        {results.map((track) => (
          <li
            key={track.id}
            className="p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700"
            onClick={() => onTrackSelect(track)}
          >
            <strong>{track.name}</strong> - {track.artists.map((artist) => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
