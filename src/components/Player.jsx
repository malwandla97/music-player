// src/components/Player.jsx

import React, { useState, useEffect } from 'react';
import {
  playTrack,
  pauseTrack,
  skipTrack,
  getDevices,
  searchTracks,
  setAccessToken,
} from '../spotifyService';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [track, setTrack] = useState({
    name: 'Track Name',
    artist: 'Artist Name',
    album: 'Album Name',
    uri: '',
  });
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setAccessToken('YOUR_SPOTIFY_ACCESS_TOKEN'); // Replace with your valid token
    const fetchDevices = async () => {
      try {
        const devices = await getDevices();
        if (devices.length > 0) {
          setDeviceId(devices[0].id); // Automatically select the first device
        } else {
          console.error('No active devices found.');
        }
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    fetchDevices();
  }, []);

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pauseTrack();
      } else {
        await playTrack(deviceId, track.uri);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error.message);
    }
  };

  const handleSkip = async () => {
    try {
      await skipTrack();
    } catch (error) {
      console.error('Error skipping track:', error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchTracks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching tracks:', error.message);
    }
  };

  const handleTrackSelect = (track) => {
    setTrack({
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    });
    setIsPlaying(false); // Reset playback state
  };

  return (
    <div className="player p-4 bg-gray-900 text-white rounded-lg max-w-md mx-auto">
      <div className="track-info mb-4 text-center">
        <h1 className="text-2xl font-bold">{track.name}</h1>
        <p className="text-sm">{track.artist} - {track.album}</p>
      </div>

      <div className="controls flex justify-between items-center">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleSkip}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
        >
          Skip
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a track..."
          className="p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <ul className="search-results mt-4">
        {searchResults.map((result) => (
          <li
            key={result.id}
            className="p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700"
            onClick={() => handleTrackSelect(result)}
          >
            <strong>{result.name}</strong> -{' '}
            {result.artists.map((artist) => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
