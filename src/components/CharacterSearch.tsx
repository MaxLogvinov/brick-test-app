import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

function CharacterSearch() {
  return (
    <div className="border-2 border-white sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-2xl font-get-schwifty bg-inherit text-inherit mt-3 max-sm:border-none max-sm:w-full">
      <div className="flex items-center rounded-2xl flex-col p-6 gap-4 bg-inherit ">
        <h1 className=" sm:text-2xl lg:text-3xl xl:text-4xl">The universe of Rick and Morty</h1>
        <label className="flex flex-col w-full">
          Character name
          <input
            type="text"
            className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
            placeholder="Enter the character's name"
          />
        </label>
        <div className="flex items-center justify-between w-full gap-8 bg-inherit max-sm:flex-col">
          <label className="flex flex-col w-full bg-inherit">
            Alive?
            <select
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
              value={'reset'}
            >
              <option value="reset">select status / reset</option>
            </select>
          </label>
          <label className="flex flex-col w-full bg-inherit">
            Species
            <select className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer">
              <option value="reset">select species / reset</option>
            </select>
          </label>
        </div>
        <Accordion className="w-full bg-zinc-800 border-white text-inherit flex flex-col rounded-2xl">
          <AccordionSummary>Episodes:</AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default CharacterSearch;
