class Schematic {
  #map: string[][];
  #width: number;
  #height: number;

  constructor(map: string) {
    this.#map = map.trim().split("\n").map((line) => line.split(""));
    this.#width = this.#map[0].length;
    this.#height = this.#map.length;
  }

  get(x: number, y: number): string {
    return this.#map[y][x];
  }

  isDigit(x: number, y: number): boolean {
    const c = this.get(x, y);
    return c >= "0" && c <= "9";
  }

  outSide(x: number, y: number): boolean {
    return x < 0 || x >= this.#width || y < 0 || y >= this.#height;
  }

  empty(x: number, y: number): boolean {
    const c = this.get(x, y);
    return c === ".";
  }

  getPartSymbol(x: number, y: number, number: number) {
    if (number === 0) {
      return null;
    }
    const numberLength = number.toString().length;
    for (let xp = x - 1; xp <= x + numberLength; xp++) {
      for (let yp = y - 1; yp <= y + 1; yp++) {
        if (this.outSide(xp, yp) || this.isDigit(xp, yp)) {
          continue;
        }
        if (!this.empty(xp, yp)) {
          return {
            x: xp,
            y: yp,
            symbol: this.get(xp, yp),
          };
        }
      }
    }
    return null;
  }

  getNumber(x: number, y: number): number {
    let length = 0;
    while (this.isDigit(x + length, y)) {
      length++;
    }
    if (length === 0) {
      return 0;
    }
    const number = parseInt(this.#map[y].slice(x, x + length).join(""));
    return number;
  }

  getPartNumbers() {
    const partNumbers = [];
    for (let y = 0; y < this.#height; y++) {
      for (let x = 0; x < this.#width; x++) {
        const number = this.getNumber(x, y);
        const partSymbol = this.getPartSymbol(x, y, number);
        if (partSymbol !== null) {
          partNumbers.push({ number, partSymbol, x, y });
          x += number.toString().length;
        }
      }
    }
    return partNumbers;
  }

  getGearNumbers() {
    const partNumbers = this.getPartNumbers();
    return partNumbers.filter((number) => number.partSymbol.symbol === "*");
  }

  getGears() {
    const gears: { [key: string]: number[] } = {};
    this.getGearNumbers()
      .forEach((number) => {
        const { x, y } = number.partSymbol;
        const position = `${x},${y}`;
        if (gears[position]) {
          gears[position].push(number.number);
        } else {
          gears[position] = [number.number];
        }
      });
    return Object.values(gears);
  }
}

export function part1(input: string): number {
  const schematic = new Schematic(input);
  return schematic
    .getPartNumbers()
    .reduce(
      (a, partNumber) => a + partNumber.number,
      0,
    );
}

export function part2(input: string): number {
  const schematic = new Schematic(input);

  function getGearRatio(gear: number[]): number {
    if (gear.length === 1) {
      return 0;
    }
    return gear.reduce((a, b) => a * b, 1);
  }

  return schematic
    .getGears()
    .reduce((a, gears) => a + getGearRatio(gears), 0);
}
