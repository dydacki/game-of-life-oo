import { stageSize } from '../variables.js';
import { Cell } from './Cell.js';

export class Board {
  private _cells: Cell[][];

  constructor(cells: boolean[][]) {
    this._cells = cells.map((row, i) => row.map((cell, j) => new Cell(i, j, cell)));
    this.addNeighbours();
  }

  cells = (): Cell[][] => this._cells;

  evolve = (): void => {
    this._cells.forEach(row => row.forEach(cell => cell.setNextState()));
    this._cells.forEach(row => row.forEach(cell => cell.evolve()));
  };

  shift = (): void => {
    let newCells = Array.from({ length: stageSize }, () => Array(stageSize).fill(null));
    for (let i = 1; i < stageSize; i++) {
      for (let j = 1; j < stageSize; j++) {
        newCells[i - 1][j - 1] = this._cells[i][j];
      }
    }

    for (let i = 0; i < stageSize; i++) {
      newCells[i][stageSize - 1] = new Cell(i, stageSize - 1, false);
      newCells[stageSize - 1][i] = new Cell(stageSize - 1, i, false);
    }

    this._cells = newCells;
    this.updateNeighbours();
  };

  private addNeighbours = (): void => {
    for (let i = 0; i < stageSize; i++) {
      for (let j = 0; j < stageSize; j++) {
        this.calculateNeighbours(i, j);
      }
    }
  };

  private updateNeighbours = (): void => {
    const last = stageSize - 1;
    const secondLast = stageSize - 2;

    for (let i = 0; i < stageSize; i++) {
      this.calculateNeighbours(secondLast, i);
      this.calculateNeighbours(i, secondLast);
    }

    for (let i = 0; i < stageSize; i++) {
      this.calculateNeighbours(last, i);
      this.calculateNeighbours(i, last);
    }
  };

  private calculateNeighbours = (i: number, j: number): void => {
    this._cells[i][j].neighbours.splice(0, this._cells[i][j].neighbours.length);
    const potentialNeighbours = [
      [i - 1, j - 1],
      [i, j - 1],
      [i + 1, j - 1],
      [i - 1, j],
      [i + 1, j],
      [i - 1, j + 1],
      [i, j + 1],
      [i + 1, j + 1],
    ];

    potentialNeighbours
      .filter(([x, y]) => x >= 0 && x < stageSize && y >= 0 && y < stageSize)
      .forEach(([x, y]) => this._cells[i][j].neighbours.push(this._cells[x][y]));
  };
}
