import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../servises/thunks/charactersThunk';
import type { RootState } from '../servises/store';
import type { AppDispatch } from '../servises/store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Episodes from './Episodes';
import { fetchEpisodes } from '../servises/thunks/episodesThunk';
import { speciesOptions, statusOptions } from '../utils/options';
import { clearEpisodes } from '../servises/slices/episodesSlice';
import Loading from './Loading';
import CharacterAccordion from './CharacterAccordion';
import type { Character } from '../types/types';
import { setName, setSpecies, setStatus } from '../servises/slices/characterSlice';
import { Box, Typography, Select, MenuItem, TextField, FormControl } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

const DEBOUNCE_DELAY = 1000;

export default function CharacterSearch() {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, name, status, species } = useSelector(
    (state: RootState) => state.characters
  );
  const { episodes } = useSelector((state: RootState) => state.episodes);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (name.trim() || status || species) {
        dispatch(fetchCharacters({ name, status, species })).then(action => {
          if (fetchCharacters.fulfilled.match(action)) {
            const { results } = action.payload;
            const allEpisodeUrls = results.flatMap((character: Character) => character.episode);
            dispatch(fetchEpisodes(Array.from(new Set(allEpisodeUrls))));
          } else if (fetchCharacters.rejected.match(action)) {
            dispatch(clearEpisodes());
          }
        });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [name, status, species, dispatch]);

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    dispatch(setStatus(value));
  };

  const handleSpeciesChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    dispatch(setSpecies(value));
  };

  return (
    <Box className="border-2 border-white sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-2xl font-get-schwifty bg-inherit text-inherit mt-3 max-sm:border-none max-sm:w-full">
      <Box className="flex items-center rounded-2xl flex-col p-6 gap-4 bg-inherit ">
        <Typography
          variant="h4"
          component="h1"
          className=" sm:text-2xl lg:text-3xl xl:text-4xl text-center"
        >
          The universe of Rick and Morty
        </Typography>
        <FormControl fullWidth>
          <Typography component={'label'} className="flex flex-col w-full">
            Character name
            <TextField
              type="text"
              value={name}
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
              onChange={e => dispatch(setName(e.target.value))}
              placeholder="Enter the character's name"
            />
          </Typography>
        </FormControl>
        <Box className="flex items-center justify-between w-full gap-8 bg-inherit max-sm:flex-col">
          <FormControl fullWidth>
            <Typography component={'label'} className="flex flex-col w-full bg-inherit">
              Alive?
              <Select
                className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
                value={status ?? 'reset'}
                onChange={handleStatusChange}
              >
                <MenuItem value="reset">select status / reset</MenuItem>
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Typography>
          </FormControl>
          <FormControl fullWidth>
            <Typography component={'label'} className="flex flex-col w-full bg-inherit">
              Species
              <Select
                className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
                value={species ?? 'reset'}
                onChange={handleSpeciesChange}
              >
                <MenuItem value="reset">select species / reset</MenuItem>
                {speciesOptions.map(species => (
                  <MenuItem key={species} value={species}>
                    {species}
                  </MenuItem>
                ))}
              </Select>
            </Typography>
          </FormControl>
        </Box>
        <Accordion
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
          className="w-full bg-zinc-800 border-white text-inherit flex flex-col rounded-2xl"
        >
          <AccordionSummary>Episodes:</AccordionSummary>
          <AccordionDetails>
            {episodes.length > 0 && (
              <Episodes episodes={episodes} onClose={() => setExpanded(false)} />
            )}
          </AccordionDetails>
        </Accordion>
        {error && <p className="text-4xl max-sm:text-base">Error: Characters not found</p>}
      </Box>
      <CharacterAccordion />
      {loading && <Loading />}
    </Box>
  );
}
