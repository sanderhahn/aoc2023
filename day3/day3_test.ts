import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day3.ts";
import { input } from "./input.ts";

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 4361);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 509115);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 467835);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 75220503);
});
