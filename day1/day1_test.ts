import { assertEquals } from "std/assert/mod.ts";
import { part1, part2 } from "./day1.ts";
import { input } from "./input.ts";

const example1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example1), 142);
});

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

Deno.test("part2(example)", () => {
  assertEquals(part2(example2), 281);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 53194);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 54249);
});
