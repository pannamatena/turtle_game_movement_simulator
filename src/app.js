const fs = require('fs');
const parseArgs = require('minimist');
const TurtleChallengeGameSimulation = require('./turtle-challenge-game-simulation/turtle-challenge-game-simulation');

const getArguments = () => {
  const args = parseArgs(process.argv.slice(2));

  const gridFilePath = args.grid;
  const movesFilePath = args.moves;

  if (!gridFilePath || !movesFilePath) {
    console.log('usage: turtle-challenge.exe --grid <grid file path> --moves <moves file path>');
    process.exit(1);
  }
  return {
    gridFilePath: gridFilePath,
    movesFilePath: movesFilePath
  }
};

const getGridJson = gridFilePath => {
  let gridFile;
  try {
    gridFile = fs.readFileSync(gridFilePath, 'utf8');
  } catch (err) {
    console.log('There was a problem loading the grid file.');
    process.exit(1);
  }
  return JSON.parse(gridFile);
};

const getMovesJson = movesFilePath => {
  let movesFile;
  try {
    movesFile = fs.readFileSync(movesFilePath, 'utf8');
  } catch (err) {
    console.log('There was a problem loading the moves file.');
    process.exit(1);
  }
  return JSON.parse(movesFile);
};

const args = getArguments();
const gridJson = getGridJson(args.gridFilePath);
const movesJson = getMovesJson(args.movesFilePath);

const grid = gridJson.grid;
const moves = movesJson.moves;
const start = gridJson.start;
const exit = gridJson.exit;
const mines = gridJson.mines;

const simulation = new TurtleChallengeGameSimulation(grid, moves, start, exit, mines);
console.log(simulation.simulateGame());
