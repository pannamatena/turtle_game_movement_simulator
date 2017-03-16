# Turtle Challenge simulator

## What is this?
This is a game simulation that calculates the outcome of the game based on the preset options passed as parameters.

The simulator calculates whether or not the game will end in success or failure, and whether we reach the exit of the given grid area. The game starts at the start coordinate, which marks the tile of the grid where movements are calculated from. The aim is to reach the exit without hitting a tile with a mine on it. Possible outcomes are 'Mine hit!', 'Success' and 'Still in danger'.


## How to run?
To start the simulation run `node src/app.js <grid file path> <moves file path>` in console.

## Tests
Install dependencies with `npm install`.
Run unit tests with `npm run test`.
