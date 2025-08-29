import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Avatar, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../servises/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchCharacters } from '../servises/thunks/charactersThunk';

export default function CharacterAccordion() {
  const { characters, info, name, status, species } = useSelector(
    (state: RootState) => state.characters
  );
  const { episodes } = useSelector((state: RootState) => state.episodes);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchCharacters({ name, status, species, page }));
  };

  return (
    <Box className="py-1 px-0.5 bg-inherit text-inherit flex flex-col items-center mb-3">
      {characters.map(character => (
        <Accordion
          className="bg-zinc-800 w-full border-white text-inherit flex flex-col rounded-2xl"
          key={character.id}
          sx={{
            '@media (max-width: 599px)': {
              maxWidth: '90vw',
              marginLeft: 'auto',
              marginRight: 'auto'
            }
          }}
        >
          <AccordionSummary className="w-full flex items-center max-sm:justify-center max-sm:flex-col">
            <Box className=" flex justify-center items-center gap-5 rounded-2xl  max-sm:flex-col max-sm:justify-center max-sm:self-center max-sm:gap-1">
              <Box className="flex items-center gap-5 max-sm:gap-1">
                <Avatar src={character.image} alt={character.name} sx={{ width: 56, height: 56 }} />
                <Typography component="h2" fontSize={20} className="px-4 max-sm:text-base">
                  {character.name}
                </Typography>
              </Box>
              <Box className="flex items-center justify-end gap-5 max-sm:gap-1 max-sm:flex-col  max-sm:justify-center">
                <Typography component={'p'} className="pl-4 text-base max-sm:text-sm">
                  Gender: {character.gender}
                </Typography>
                <Typography component={'p'} className="pl-4 text-base max-sm:text-sm">
                  Status: {character.status}
                </Typography>
                <Typography component={'p'} className="pl-4 text-base max-sm:text-sm">
                  Species: {character.species}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className="rounded-2xl">
            <List component="ol" className="list-decimal ml-5">
              <Typography component="p" className="pb-2.5">
                Episodes:
              </Typography>
              {character.episode.map(episodeUrl => {
                const episode = episodes.find(ep => ep.url === episodeUrl);
                if (!episode) {
                  return (
                    <ListItem key={episodeUrl} component="li">
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  );
                }
                const [series, episodeNumber] = episode.episode.slice(1).split('E');
                const formattedText = `Series: ${series}, Episode: ${episodeNumber}`;
                return (
                  <ListItem key={episodeUrl} component="li" sx={{ p: 0 }}>
                    <ListItemText primary={`${formattedText} - ${episode.name}`} />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      <Stack
        className="text-white [&_.Mui-selected]:bg-white/20 [&_.Mui-selected]:text-white"
        spacing={2}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white'
          },
          '& .Mui-selected': {
            backgroundColor: 'rgba(23, 23, 23, 0.2)',
            color: 'white'
          }
        }}
      >
        <Pagination count={info.pages} onChange={handlePageChange} color="primary" />
      </Stack>
    </Box>
  );
}
