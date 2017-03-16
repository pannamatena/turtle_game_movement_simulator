const fs = require('fs');
const TurtleChallengeGameSimulation = require('./turtle-challenge-game-simulation/turtle-challenge-game-simulation');

/**
 * Gets the necessary arguments for the simulation parameters.
 *
 * @return {{gridFilePath: string, movesFilePath: string}} File paths for the grid and the movements.
 */
const getArguments = () => {
  const commandWithArguments = process.argv;
  const args = commandWithArguments.slice(2);

  const gridFilePath = args[0];
  const movesFilePath = args[1];

  if (!gridFilePath || !movesFilePath) {
    console.log('Missing parameters! Please provide grid file path and moves file path.');
    process.exit(1);
  }
  return {
    gridFilePath: gridFilePath,
    movesFilePath: movesFilePath
  }
};

/**
 * Gets the grid JSON data from file data.
 *
 * @param gridFilePath - Path to the file containing grid data
 * @return {Object} The object containing the grid data.
 */
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

/**
 * Gets the movement JSON data from file data.
 *
 * @param movesFilePath - Path to the file containing grid data
 * @return {Object} The object containing the grid data.
 */
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

try {
  const simulation = new TurtleChallengeGameSimulation(grid, moves, start, exit, mines);
  console.log(simulation.simulateGame());
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
