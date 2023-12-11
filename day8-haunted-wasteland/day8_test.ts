import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day8.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day8-haunted-wasteland/input.txt");

const example1 = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

Deno.test("part1(example1)", () => {
  assertEquals(part1(example1), 2);
});

const example2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

Deno.test("part1(example2)", () => {
  assertEquals(part1(example2), 6);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 19783);
});

const example3 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

Deno.test("part2(example)", () => {
  assertEquals(part2(example3), 6);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 9177460370549);
});
