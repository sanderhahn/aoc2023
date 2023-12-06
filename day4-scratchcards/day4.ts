function parseCard(line: string) {
  const [_card, numbers] = line.split(/:\s+/);
  const [winning, actual] = numbers.split(" | ");
  const winningNumbers = winning.split(/\s+/);
  const actualNumbers = actual.split(/\s+/);
  const matches = actualNumbers.reduce(
    (a, b) => a + (winningNumbers.includes(b) ? 1 : 0),
    0,
  );
  const points = matches === 0 ? 0 : Math.pow(2, matches - 1);
  return { matches, points, count: 1 };
}

export function part1(input: string): number {
  return input.trim().split("\n").map((line) => parseCard(line)).reduce(
    (a, b) => a + b.points,
    0,
  );
}

export function part2(input: string): number {
  const games = input.trim().split("\n").map((line) => parseCard(line));
  games.forEach((game, index) => {
    for (let i = 0; i < game.matches; i++) {
      const gameCopy = games[index + i + 1];
      gameCopy.count += game.count;
    }
  });
  return games.reduce((a, b) => a + b.count, 0);
}
