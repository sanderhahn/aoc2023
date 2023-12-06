interface Range {
  source: number;
  destination: number;
  length: number;
}
interface Almanac {
  seeds: number[];
  seedRanges: {
    start: number;
    end: number;
  }[];
  maps: {
    mapName: string;
    ranges: Range[];
  }[];
}

export function parseAlmanac(input: string): Almanac {
  const parts = input.trim().split("\n\n");
  if (!parts) {
    throw new Error("Invalid almanac");
  }
  const seeds = parts.shift()?.split(": ")[1].split(" ").map((number) =>
    parseInt(number, 10)
  );
  if (!seeds) {
    throw new Error("Invalid almanac");
  }
  const seedsCopy = [...seeds];
  const seedRanges = [];
  while (seedsCopy.length > 0) {
    const start = seedsCopy.shift();
    const length = seedsCopy.shift();
    if (!start || !length) {
      throw new Error("Invalid almanac");
    }
    const end = start + length - 1;
    seedRanges.push({ start, end });
  }
  const maps = parts.map((mapping) => {
    const [mapName, lines] = mapping.split(" map:\n");
    const ranges = lines.split("\n").map((line) => {
      const [source, destination, length] = line.split(" ").map((number) =>
        parseInt(number, 10)
      );
      return { source, destination, length };
    });
    return { mapName, ranges };
  });
  return { seeds, seedRanges, maps };
}

export function mapSeed(
  seed: number,
  { source, destination, length }: {
    source: number;
    destination: number;
    length: number;
  },
) {
  const destinationEnd = destination + length - 1;
  if (seed >= destination && seed <= destinationEnd) {
    const diff = destination - source;
    return seed - diff;
  }
  return -1;
}

export function processRanges(seed: number, ranges: Range[]): number {
  for (const range of ranges) {
    const newSeed = mapSeed(seed, range);
    if (newSeed !== -1) {
      return newSeed;
    }
  }
  return seed;
}

export function processMaps(seed: number, almanac: Almanac): number {
  return almanac.maps.reduce((value, mapping) => {
    return processRanges(value, mapping.ranges);
  }, seed);
}

export function mapSeeds(almanac: Almanac) {
  return almanac.seeds.map((seed) => {
    return almanac.maps.reduce((value, mapping) => {
      return processRanges(value, mapping.ranges);
    }, seed);
  });
}

export function part1(input: string): number {
  const almanac = parseAlmanac(input);
  const locations = mapSeeds(almanac);
  return locations.reduce((a, b) => Math.min(a, b));
}

function* expandSeedRanges(almanac: Almanac) {
  for (const range of almanac.seedRanges) {
    for (let i = range.start; i <= range.end; i++) {
      yield i;
    }
  }
}

export function part2(input: string): number {
  const almanac = parseAlmanac(input);
  let min = -1;
  for (const seed of expandSeedRanges(almanac)) {
    const location = processMaps(seed, almanac);
    if (min === -1) {
      min = location;
      continue;
    }
    min = Math.min(min, location);
  }
  return min;
}
