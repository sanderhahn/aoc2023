export function parseInput(input: string) {
  const result = input
    .split("\n")
    .map((line) => {
      const [game, takes] = line.split(": ");
      const [_, id] = game.split(" ");
      return {
        id,
        takes: takes
          .split("; ")
          .map((take) => {
            const cubes = Object.fromEntries(
              take
                .split(", ")
                .map((numberAndColor) => {
                  const [number, color] = numberAndColor.split(" ");
                  return [color, parseInt(number)];
                }),
            );
            return {
              red: cubes?.red || 0,
              green: cubes?.green || 0,
              blue: cubes?.blue || 0,
            } as Take;
          }),
      };
    });
  return result;
}

interface Take {
  red: number;
  green: number;
  blue: number;
}

function impossibleTake(
  { red, green, blue }: Take,
) {
  if (red && red > 12) {
    return true;
  }
  if (green && green > 13) {
    return true;
  }
  if (blue && blue > 14) {
    return true;
  }
  return false;
}

export function part1(input: string): number {
  const games = parseInput(input);
  const result = games
    .map(({ id, takes }) => takes.some(impossibleTake) ? 0 : parseInt(id))
    .reduce((a, b) => a + b, 0);
  return result;
}

function minCubes(
  a: Take,
  b: Take,
) {
  return {
    red: Math.max(a?.red || 1, b?.red || 1),
    green: Math.max(a?.green || 1, b?.green || 1),
    blue: Math.max(a?.blue || 1, b?.blue || 1),
  };
}

function powCube(
  { red, green, blue }: Take,
) {
  return red * green * blue;
}

const unitTake: Take = { red: 1, green: 1, blue: 1 };

export function part2(input: string): number {
  const games = parseInput(input);
  return games.map(({ takes }) =>
    takes.reduce((a, b) => minCubes(a, b), unitTake)
  ).map(powCube).reduce((a, b) => a + b);
}
