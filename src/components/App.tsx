import { Box } from '@mui/material';
import CharacterSearch from './CharacterSearch';

function App() {
  return (
    <Box className="grid items-center justify-items-center font-get-schwifty bg-inherit">
      <Box component="header" className="flex flex-wrap items-center justify-center"></Box>
      <Box component="main" className="flex flex-col gap-8 items-center w-full bg-inherit ">
        <CharacterSearch />
      </Box>
      <Box component="footer" className="flex gap-6 flex-wrap items-center justify-center"></Box>
    </Box>
  );
}

export default App;
