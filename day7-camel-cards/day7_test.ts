import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day7.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day7-camel-cards/input.txt");

const example = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 6440);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 250951660);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 5905);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 251481660);
});
