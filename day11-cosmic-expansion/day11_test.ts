import { GalaxyMap, part1, part2 } from "./day11.ts";
import { assertEquals } from "std/assert/mod.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day11-cosmic-expansion/input.txt");

const example = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

Deno.test("distances for part1(example)", () => {
  const galaxyMap = new GalaxyMap(example);
  assertEquals(galaxyMap.galaxyDistance(1, 7), 15);
  assertEquals(galaxyMap.galaxyDistance(3, 6), 17);
  assertEquals(galaxyMap.galaxyDistance(8, 9), 5);
});

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 374);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 9965032);
});

Deno.test("part2(example, 10)", () => {
  assertEquals(part2(example, 10), 1030);
});

Deno.test("part2(example, 100)", () => {
  assertEquals(part2(example, 100), 8410);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input, 1000000), 550358864332);
});
