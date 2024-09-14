# Glider Game of Life

This project implements Conway's Game of Life with a glider pattern that continuously moves across an infinite grid. The game is rendered on an HTML canvas and provides interactive controls for starting, stopping, and resetting the simulation.

## Description

The Glider Game of Life is a cellular automaton simulation that demonstrates how simple rules can create complex, emergent behavior. In this implementation, a glider pattern is initialized at the center of the grid and moves diagonally across an infinite plane.

## How to Run

To run this application in your browser using Live Server, follow these steps:

1. Ensure you have Node.js installed on your system.

2. Install TypeScript globally by running:

   ```
   npm install -g typescript
   ```

3. Clone this repository and navigate to the project directory.

4. Install project dependencies:

   ```
   npm install
   ```

5. Transpile TypeScript to JavaScript:

   ```
   tsc
   ```

6. Install Live Server globally if you haven't already:

   ```
   npm install -g live-server
   ```

7. Start Live Server in the project directory:

   ```
   npm run server
   ```

8. Your default browser should open automatically. If not, open a browser and go to `http://localhost:8080` (or the port specified by Live Server).

9. You should now see the Glider Game of Life running in your browser. Use the provided buttons to start, stop, and reset the simulation.

Enjoy watching the glider pattern evolve and traverse the infinite grid!
