import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day6.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day6-wait-for-it");

const example = `
Time:      7  15   30
Distance:  9  40  200
`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 288);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 275724);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 71503);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 37286485);
});
