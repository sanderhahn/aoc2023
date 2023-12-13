import { part1, part2 } from "./day13.ts";
import { assertEquals } from "std/assert/mod.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day13-mirrors/input.txt");

const example = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 405);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 33520);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 400);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 34824);
});
