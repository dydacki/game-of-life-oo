const stageSize = 25;
const tileSize = 20;
const glideSpeedFactor = 5;

let board: Board;
let canvas: HTMLCanvasElement;
let interval: NodeJS.Timeout;
let iteration: number = 0;
let leftPosition: number = 0;
let topPosition: number = 0;
let play: boolean = false;

import { Board } from './model/Board.js';

const seedGlider = (): boolean[][] => {
  const startIndex = Math.floor(stageSize / 2) - 1;
  const seed = Array(stageSize)
    .fill([])
    .map(() => Array(stageSize).fill(false));

  [
    [true, false, false],
    [false, true, true],
    [true, true, false],
  ].forEach((row, i) => {
    row.forEach((cell, j) => {
      seed[i + startIndex][j + startIndex] = cell;
    });
  });

  return seed;
};

const drawGrid = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (var i = 0; i <= stageSize * tileSize; i += tileSize) {
    if (i - leftPosition > 0 && i - topPosition > 0) {
      ctx.moveTo(i - leftPosition, 0);
      ctx.lineTo(i - leftPosition, stageSize * tileSize);
      ctx.moveTo(0, i - topPosition);
      ctx.lineTo(stageSize * tileSize, i - topPosition);
    }
  }
  ctx.stroke();
};

const drawBoard = (ctx: CanvasRenderingContext2D): void => {
  ctx.beginPath();
  for (var i = 0; i < stageSize; i++) {
    for (var j = 0; j < stageSize; j++) {
      if (board.cells()[i][j].isAlive) {
        ctx.fillRect(j * tileSize - leftPosition + 2, i * tileSize - leftPosition + 2, tileSize - 4, tileSize - 4);
      }
    }
  }
};

const startAnimation = (): void => {
  const ctx = canvas.getContext('2d');
  interval = setInterval(() => {
    topPosition += 1;
    leftPosition += 1;
    drawGrid(ctx);
    drawBoard(ctx);

    if (topPosition % glideSpeedFactor === 0) {
      board.evolve();
      iteration++;
    }

    if (leftPosition === tileSize || topPosition === tileSize) {
      board.shift();
      leftPosition = 0;
      topPosition = 0;
    }
  }, 100);
};

const stopAnimation = (): void => {
  clearInterval(interval);
};

const startStopAnimation = () => {
  play = !play;
  const button = document.getElementById('startStopButton') as HTMLButtonElement;
  (document.getElementById('resetButton') as HTMLButtonElement).disabled = false;
  if (play) {
    button.innerHTML = 'Stop game';
    startAnimation();
  } else {
    button.innerHTML = 'Resume game';
    stopAnimation();
  }
};

const initCanvas = (): void => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  var parent = document.getElementById('canvasContainer') as HTMLDivElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  board = new Board(seedGlider());
  let ctx = canvas.getContext('2d');
  drawGrid(ctx);
  drawBoard(ctx);
};

const resetAnimation = (): void => {
  stopAnimation();
  leftPosition = 0;
  topPosition = 0;
  iteration = 0;
  play = false;
  initCanvas();
  (document.getElementById('startStopButton') as HTMLButtonElement).innerHTML = 'Start game';
  (document.getElementById('resetButton') as HTMLButtonElement).disabled = true;
};

globalThis.initCanvas = initCanvas;
globalThis.resetAnimation = resetAnimation;
globalThis.startStopAnimation = startStopAnimation;
