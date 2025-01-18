// src/spotify.js
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const authenticateSpotify = () => {
  const clientId = '67b95b36f71549219cefe68cdc4e31d7';
  const redirectUri = 'http://localhost:3000/';
  
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-library-read&response_type=token`;
  
  window.location.href = authUrl;
}

export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token);
}

export const getUserPlaylists = async () => {
  try {
    const playlists = await spotifyApi.getUserPlaylists();
    console.log(playlists);
  } catch (error) {
    console.error("Error fetching playlists", error);
  }
}

export default spotifyApi;