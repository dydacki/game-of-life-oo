export class Cell {
  constructor(
    private _x: number,
    private _y: number,
    private _isAlive: boolean,
    private _neighbours: Cell[] = [],
    private _isAliveNext: boolean = false,
  ) {}

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  get isAliveNext(): boolean {
    return this._isAliveNext;
  }

  get neighbours(): Cell[] {
    return this._neighbours;
  }

  setNextState(): void {
    const aliveNeighbours = this._neighbours.filter(n => n.isAlive).length;
    if (this._isAlive) {
      this._isAliveNext = aliveNeighbours === 2 || aliveNeighbours === 3;
    } else {
      this._isAliveNext = aliveNeighbours === 3;
    }
  }

  evolve(): void {
    this._isAlive = this._isAliveNext;
  }
}
