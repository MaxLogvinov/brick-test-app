import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../servises/store.ts';
import { fetchCharactersByUrls } from '../servises/thunks/charactersThunk';
import type { Episode } from '../types/types';
import { setName, setSpecies, setStatus } from '../servises/slices/characterSlice';
import { Box, Typography, Button } from '@mui/material';

interface EpisodesProps {
  episodes: Episode[];
}

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEpisodeClick = (characterUrls: string[]) => {
    dispatch(fetchCharactersByUrls(characterUrls));
    dispatch(setName(''));
    dispatch(setSpecies(''));
    dispatch(setStatus(''));
  };

  return (
    <Box className="w-full">
      {episodes.map(episode => (
        <Accordion key={episode.id} className="bg-zinc-800 text-inherit">
          <AccordionSummary>{episode.name}</AccordionSummary>
          <AccordionDetails>
            <Typography component="p">Air Date: {episode.air_date}</Typography>
            <Button
              variant="contained"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => handleEpisodeClick(episode.characters)}
            >
              Show Characters
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Episodes;
