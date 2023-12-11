import { loadInput } from "../input.ts";
import { part1, part2 } from "./day9.ts";
import { assertEquals } from "std/assert/mod.ts";
const input = loadInput("day9-maintenance/input.txt");

const example = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 114);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 2174807968);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 2);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 1208);
});
