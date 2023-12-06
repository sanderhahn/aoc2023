function holdShort(time: number, distance: number): number {
  for (let hold = 0; hold < time; hold++) {
    const timeLeft = time - hold;
    const traveled = hold * timeLeft;
    if (traveled > distance) {
      return hold;
    }
  }
  throw new Error("should not happen");
}

function holdLong(time: number, distance: number): number {
  for (let hold = time - 1; hold > 0; hold--) {
    const timeLeft = time - hold;
    const traveled = hold * timeLeft;
    if (traveled > distance) {
      return hold;
    }
  }
  throw new Error("should not happen");
}

function waysToWin(time: number, distance: number): number {
  const short = holdShort(time, distance);
  const long = holdLong(time, distance);
  return long - short + 1;
}

export function part1(input: string): number {
  const [times, distances] = input.trim().split("\n").map((line) => {
    return line.split(/\s+/).slice(1).map((x) => parseInt(x, 10));
  });
  const ways = [];
  for (let i = 0; i < times.length; i++) {
    ways.push(waysToWin(times[i], distances[i]));
  }
  return ways.reduce((a, b) => a * b, 1);
}

export function part2(input: string): number {
  const [time, distance] = input.trim().split("\n").map((line) => {
    const [_label, badNumber] = line.split(/:\s+/);
    const number = badNumber.replace(/\s+/g, "");
    return parseInt(number, 10);
  });
  return waysToWin(time, distance);
}
