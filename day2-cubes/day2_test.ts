import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day2.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day2-cubes");

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 8);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 2286);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 2879);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 65122);
});
