import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Episode } from '../../types/types';

export const fetchEpisodes = createAsyncThunk<Episode[], string[], { rejectValue: string }>(
  'episodes/fetchEpisodes',
  async (episodeUrls, { rejectWithValue }) => {
    try {
      const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',');
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
      return Array.isArray(response.data) ? response.data : [response.data];
      //eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch episodes');
    }
  }
);
