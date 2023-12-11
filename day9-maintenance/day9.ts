function diffs(input: number[]): number[] {
  const diffs = [];
  for (let i = 1; i < input.length; i++) {
    diffs.push(input[i] - input[i - 1]);
  }
  return diffs;
}

function allZero(input: number[]): boolean {
  return input.every((n) => n === 0);
}

function makeDiffs(line: number[]) {
  const firsts = [];
  const lasts = [];
  do {
    const last = line.at(-1);
    if (last === undefined) {
      throw new Error("last is undefined");
    }
    lasts.push(last);
    const first = line.at(0);
    if (first === undefined) {
      throw new Error("first is undefined");
    }
    firsts.push(first);
    line = diffs(line);
  } while (!allZero(line));
  const next = lasts.reduceRight((acc, n) => acc + n, 0);
  const previous = firsts.reduceRight((acc, n) => n - acc, 0);
  return { previous, next };
}

function parseInput(input: string): number[][] {
  return input.trim().split("\n").map((line) => line.split(" ").map(Number));
}

export function part1(input: string): number {
  const diffs = parseInput(input).map(makeDiffs);
  return diffs.reduce((acc, n) => acc + n.next, 0);
}

export function part2(input: string): number {
  const diffs = parseInput(input).map(makeDiffs);
  return diffs.reduce((acc, n) => acc + n.previous, 0);
}
