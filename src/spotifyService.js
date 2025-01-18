// src/spotifyService.js

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getDevices = async () => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch devices');
  }

  const data = await response.json();
  return data.devices; // Returns a list of devices
};

export const playTrack = async (deviceId, uri) => {
  if (!deviceId) throw new Error('No device ID provided');

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [uri] }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to play track');
  }
};

export const pauseTrack = async () => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to pause track');
  }
};

export const skipTrack = async () => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/next`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to skip track');
  }
};

export const searchTracks = async (query) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search tracks');
  }

  const data = await response.json();
  return data.tracks.items;
};
