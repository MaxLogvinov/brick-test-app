import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character`);
    console.log(response);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch characters';
    return message;
  }
});
