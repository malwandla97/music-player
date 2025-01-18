import React, { useState, useEffect } from 'react';
import {
  playTrack,
  pauseTrack,
  skipTrack,
  getDevices,
  setAccessToken,
} from '../spotifyService';
import Search from './Search'; // Import Search component

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [track, setTrack] = useState({
    name: 'Track Name',
    artist: 'Artist Name',
    album: 'Album Name',
    uri: '',
  });

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

  const handleTrackSelect = (selectedTrack) => {
    setTrack({
      name: selectedTrack.name,
      artist: selectedTrack.artists[0].name,
      album: selectedTrack.album.name,
      uri: selectedTrack.uri,
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

      <Search onTrackSelect={handleTrackSelect} />
    </div>
  );
};

export default Player;
