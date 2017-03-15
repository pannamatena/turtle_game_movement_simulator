const TurtleChallengeGameSimulation = require('./turtle-challenge-game-simulation/turtle-challenge-game-simulation');

const grid = { w: 4, h: 3 };
//const moves = ['move', 'rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'move', 'rotate', 'move'];
//const moves = []; // still in danger
//const moves = ['rotate', 'rotate', 'move', 'move']; // still in danger
//const moves = ['rotate', 'rotate', 'move', 'move', 'rotate', 'rotate', 'rotate', 'move', 'move', 'move', 'move']; // exit
const moves = ['rotate', 'move', 'rotate', 'move']; // mine hit
const start = { x: 0, y: 0 };
const exit = { x: 4, y: 2 };
const mines = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 3 }
];

/*
 What to test
 - grid gets whole numbers.
 - grid must have two coordinates
 - start must be within the grid
 - end must be within the grid
 - mines must be within the grid
 - mines can't be on same tile
 - moves format and content (array, string, move/rotate(or r) words)
 */

/*
TODO
- comment code
- tests
- readme
- webkit szar
 */



const simulation = new TurtleChallengeGameSimulation(grid, moves, start, exit, mines);
console.log(simulation.simulateGame());