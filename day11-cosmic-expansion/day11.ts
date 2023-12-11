interface Galaxy {
  x: number;
  y: number;
}

export class GalaxyMap {
  rows: string[][];
  width: number;
  height: number;
  galaxies: Galaxy[] = [];

  constructor(input: string, expansion = 2) {
    this.rows = input.trim().split("\n").map((line) => line.split(""));
    this.width = this.rows[0].length;
    this.height = this.rows.length;
    this.expandGalaxy(expansion);
  }

  pickColumn(x: number): string[] {
    return this.rows.map((row) => row[x]);
  }

  isEmpty(space: string[]): boolean {
    return space.every((cell) => cell === ".");
  }

  insertRow(y: number, row: string[]): void {
    this.rows.splice(y, 0, row);
    this.height++;
  }

  insertColumn(x: number, column: string[]): void {
    for (let y = 0; y < this.height; y++) {
      this.rows[y].splice(x, 0, column[y]);
    }
    this.width++;
  }

  drawAt(position: Galaxy, character = "#"): void {
    const { x, y } = position;
    this.rows[y][x] = character;
  }

  expandRows() {
    for (let y = 0; y < this.height; y++) {
      if (this.isEmpty(this.rows[y])) {
        this.insertRow(y, Array(this.width).fill("."));
        y++;
      }
    }
    for (let x = 0; x < this.width; x++) {
      const column = this.pickColumn(x);
      if (this.isEmpty(column)) {
        this.insertColumn(x, Array(this.height).fill("."));
        x++;
      }
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.rows[y][x];
        if (cell === "#") {
          this.galaxies.push({ x, y });
          this.drawAt({ x, y }, this.galaxies.length.toString());
        }
      }
    }
  }

  expandGalaxy(expansion: number) {
    let galaxyY = 0;
    let galaxyX = 0;
    for (let y = 0; y < this.height; y++) {
      if (this.isEmpty(this.rows[y])) {
        galaxyY += expansion;
      } else {
        galaxyY += 1;
      }
      galaxyX = 0;
      for (let x = 0; x < this.width; x++) {
        const column = this.pickColumn(x);
        if (this.isEmpty(column)) {
          galaxyX += expansion;
        } else {
          galaxyX += 1;
        }
        const cell = this.rows[y][x];
        if (cell === "#") {
          this.galaxies.push({ x: galaxyX, y: galaxyY });
        }
      }
    }
  }

  galaxyDistance(galaxy1: number, galaxy2: number): number {
    return this.fastDistance(
      this.galaxies[galaxy1 - 1],
      this.galaxies[galaxy2 - 1],
    );
  }

  sumShortestPaths() {
    let total = 0;
    for (let i = 0; i < this.galaxies.length; i++) {
      for (let j = i + 1; j < this.galaxies.length; j++) {
        const distance = this.galaxyDistance(i + 1, j + 1);
        total += distance;
      }
    }
    return total;
  }

  // This was unnecessary in the end, but I'm keeping it here because it was part of my discovery.
  drawLine(galaxy1: Galaxy, galaxy2: Galaxy): number {
    const dx = Math.abs(galaxy2.x - galaxy1.x);
    const dy = Math.abs(galaxy2.y - galaxy1.y);

    const cursor: Galaxy = { ...galaxy1 };
    let distance = 0;
    if (dx > dy) {
      const slope = dy / dx;
      const direction = galaxy2.x > galaxy1.x ? 1 : -1;
      let y = galaxy1.y;
      let lastY = galaxy1.y;
      while (cursor.x != galaxy2.x) {
        y += slope;
        cursor.y = Math.round(y);
        if (cursor.y != lastY) {
          this.drawAt(cursor, "#");
          distance++;
          lastY = cursor.y;
        }
        cursor.x += direction;
        this.drawAt(cursor, "#");
        distance++;
      }
    } else {
      const slope = dx / dy;
      const direction = galaxy2.y > galaxy1.y ? 1 : -1;
      let x = galaxy1.x;
      let lastX = galaxy1.x;
      while (cursor.y != galaxy2.y) {
        x += slope;
        cursor.x = Math.round(x);
        if (cursor.x != lastX) {
          this.drawAt(cursor, "#");
          distance++;
          lastX = cursor.x;
        }
        cursor.y += direction;
        this.drawAt(cursor, "#");
        distance++;
      }
    }
    return distance;
  }

  fastDistance(galaxy1: Galaxy, galaxy2: Galaxy): number {
    return Math.abs(galaxy2.x - galaxy1.x) + Math.abs(galaxy2.y - galaxy1.y);
  }

  printGalaxy() {
    console.log(this.rows.map((row) => row.join("")).join("\n"));
  }
}

export function part1(input: string): number {
  const galaxyMap = new GalaxyMap(input);
  return galaxyMap.sumShortestPaths();
}

export function part2(input: string, expansion: number): number {
  const galaxyMap = new GalaxyMap(input, expansion);
  return galaxyMap.sumShortestPaths();
}
