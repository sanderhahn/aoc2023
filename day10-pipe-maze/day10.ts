type Point = [number, number];

class PipeMaze {
  map: string[][];
  width: number;
  height: number;
  distances: number[][] = [];
  floodPath: Point[] = [];
  bitMap: string[][] = [];
  bitMapWidth = 0;
  bitMapHeight = 0;

  constructor(input: string) {
    this.map = input.trim().split("\n").map((line) => line.split(""));
    this.width = this.map[0].length;
    this.height = this.map.length;
    this.flood();
  }

  findStart(): Point {
    for (let y = 0; y < this.map.length; y++) {
      const row = this.map[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "S") {
          return [x, y];
        }
      }
    }
    throw new Error("No start found");
  }

  getDistance(point: Point) {
    const [x, y] = point;
    const distance = this.distances[y][x];
    return distance;
  }

  isPartOfLoop(point: Point): boolean {
    return this.getDistance(point) !== null;
  }

  isFlooded(point: Point): boolean {
    return this.getDistance(point) === -1;
  }

  maxDistance() {
    this.flood();
    let max = 0;
    for (let y = 0; y < this.height; y++) {
      const row = this.distances[y];
      for (let x = 0; x < this.width; x++) {
        const distance = row[x];
        if (distance !== null && distance > max) {
          max = distance;
        }
      }
    }
    return max;
  }

  getPipe(point: Point) {
    const [x, y] = point;
    const pipe = this.map[y][x];
    return pipe;
  }

  flood() {
    // left - right
    const horizontalConnections = new Set([
      "--",
      "-S",
      "S-",
      "FS",
      "LS",
      "S7",
      "SJ",
      "F-",
      "L-",
      "-J",
      "-7",
      "F7",
      "FJ",
      "LJ",
      "L7",
    ]);

    // up - down
    // F 7
    // L J
    const verticalConnections = new Set([
      "||",
      "S|",
      "|S",
      "SJ",
      "SL",
      "FS",
      "7S",
      "|J",
      "|L",
      "F|",
      "7|",
      "FJ",
      "FL",
      "FJ",
      "7J",
      "7L",
    ]);

    const connections = (point: Point) => {
      const pipe = this.getPipe(point);
      const result: Point[] = [];
      const [x, y] = point;
      const left: Point = [x - 1, y];
      if (x > 0 && this.getDistance(left) === null) {
        const leftPipe = this.getPipe(left);
        if (
          leftPipe !== "." &&
          horizontalConnections.has(leftPipe + pipe)
        ) {
          result.push(left);
        }
      }
      const right: Point = [x + 1, y];
      if (
        x < this.width - 1 &&
        this.getDistance(right) === null
      ) {
        const rightPipe = this.getPipe(right);
        if (
          rightPipe !== "." &&
          horizontalConnections.has(pipe + rightPipe)
        ) {
          result.push(right);
        }
      }
      const up: Point = [x, y - 1];
      if (y > 0 && this.getDistance(up) === null) {
        const upPipe = this.getPipe(up);
        if (
          upPipe !== "." &&
          verticalConnections.has(upPipe + pipe)
        ) {
          result.push(up);
        }
      }
      const down: Point = [x, y + 1];
      if (
        y < this.height - 1 &&
        this.getDistance(down) === null
      ) {
        const downPipe = this.getPipe(down);
        if (
          downPipe !== "." &&
          verticalConnections.has(pipe + downPipe)
        ) {
          result.push(down);
        }
      }
      return result;
    };

    this.distances = [new Array(this.height)];
    for (let y = 0; y < this.height; y++) {
      this.distances[y] = new Array(this.width).fill(null);
    }
    const start = this.findStart();
    const flood = [start];
    this.floodPath.push(start);
    let iterations = 0;
    do {
      const nextFlood: Point[] = [];
      flood.forEach((point) => {
        this.distances[point[1]][point[0]] = iterations;
        nextFlood.push(...connections(point));
      });
      flood.splice(0, flood.length);
      if (nextFlood.length === 0) {
        // skip
      } else if (nextFlood.length === 1) {
        this.floodPath.push(nextFlood.at(0)!);
      } else if (nextFlood.length === 2) {
        this.floodPath.unshift(nextFlood.at(0)!);
        this.floodPath.push(nextFlood.at(-1)!);
      } else {
        throw new Error("Invalid flood");
      }
      flood.push(...nextFlood);
      iterations++;
    } while (flood.length > 0);
  }

  isPartOfBitMaze(point: Point): boolean {
    const [x, y] = point;
    if (x < 0 || x >= this.bitMapWidth) {
      return true;
    }
    if (y < 0 || y >= this.bitMapHeight) {
      return true;
    }
    return this.bitMap[y][x] === "#";
  }

  isFloodedInBitMaze(point: Point): boolean {
    const [x, y] = point;
    if (x < 0 || x >= this.bitMapWidth) {
      return true;
    }
    if (y < 0 || y >= this.bitMapHeight) {
      return true;
    }
    return this.bitMap[y][x] === "O";
  }

  floodConnections(
    point: Point,
  ): Point[] {
    const [x, y] = point;
    const connections: Point[] = [];
    const left: Point = [x - 1, y];
    const right: Point = [x + 1, y];
    const up: Point = [x, y - 1];
    const down: Point = [x, y + 1];
    if (x > 0 && !this.isPartOfBitMaze(left)) {
      connections.push(left);
    }
    if (x < this.bitMapWidth && !this.isPartOfBitMaze(right)) {
      connections.push(right);
    }
    if (y > 0 && !this.isPartOfBitMaze(up)) {
      connections.push(up);
    }
    if (y < this.bitMapHeight && !this.isPartOfBitMaze(down)) {
      connections.push(down);
    }
    return connections;
  }

  performBitMazeFlood(
    point: Point,
  ) {
    const flood: Point[] = [point];
    do {
      const nextFlood: Point[] = [];
      flood.forEach((point) => {
        if (this.isFloodedInBitMaze(point)) {
          return;
        }
        this.bitMap[point[1]][point[0]] = "O";
        nextFlood.push(...this.floodConnections(point));
      });
      flood.splice(0, flood.length);
      flood.push(...nextFlood);
    } while (flood.length > 0);
  }

  convertToBitMaze(coordinates: Point): Point {
    const [x, y] = coordinates;
    return [x * 2 + 1, y * 2 + 1];
  }

  initializeBitMaze() {
    this.bitMapHeight = this.height * 2 + 1;
    this.bitMapWidth = this.width * 2 + 1;
    this.bitMap = new Array(this.bitMapHeight);
    for (let y = 0; y < this.height; y++) {
      const yBitMaze = y * 2 + 1;
      this.bitMap[yBitMaze - 1] = new Array(this.bitMapWidth).fill(".");
      this.bitMap[yBitMaze] = new Array(this.bitMapWidth).fill(".");
      this.bitMap[yBitMaze + 1] = new Array(this.bitMapWidth).fill(".");
    }
  }

  drawBitMaze() {
    this.initializeBitMaze();

    let lastPoint = this.convertToBitMaze(this.floodPath.at(-1)!);
    for (const point of this.floodPath) {
      const bitmapPoint = this.convertToBitMaze(point);
      const [x, y] = bitmapPoint;
      this.bitMap[y][x] = "#";
      const [lastX, lastY] = lastPoint;
      if (x === lastX) {
        this.bitMap[(y + lastY) / 2][x] = "#";
      } else if (y === lastY) {
        this.bitMap[y][(x + lastX) / 2] = "#";
      }
      lastPoint = bitmapPoint;
    }
  }

  printBitMaze() {
    console.log(this.bitMap.map((line) => line.join("")).join("\n"));
  }

  floodBitMaze() {
    for (let y = 0; y < this.bitMapHeight; y++) {
      this.performBitMazeFlood([0, y]);
      this.performBitMazeFlood([this.bitMapWidth - 1, y]);
    }
    for (let x = 0; x < this.bitMapWidth; x++) {
      this.performBitMazeFlood([x, 0]);
      this.performBitMazeFlood([x, this.bitMapHeight - 1]);
    }
  }

  countInterior(): number {
    // draw the pipe maze into a bitmap with 3x3 tiles and flood it
    // count the number of tiles that are not flooded

    this.drawBitMaze();
    this.floodBitMaze();

    let interior = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const [xBit, yBit] = this.convertToBitMaze([x, y]);
        if (this.bitMap[yBit][xBit] === ".") {
          interior++;
        }
      }
    }
    return interior;
  }
}

export function part1(input: string): number {
  const maze = new PipeMaze(input);
  return maze.maxDistance();
}

export function part2(input: string): number {
  const maze = new PipeMaze(input);
  return maze.countInterior();
}
