import { loadInput } from "../input.ts";
import { part1, part2 } from "./day10.ts";
import { assertEquals } from "std/assert/mod.ts";
const input = loadInput("day10-pipe-maze/input.txt");

const example1 = `
.....
.S-7.
.|.|.
.L-J.
.....
`;

Deno.test("part1(example1)", () => {
  assertEquals(part1(example1), 4);
});

const example2 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

Deno.test("part1(example2)", () => {
  assertEquals(part1(example2), 8);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 6701);
});

const example3 = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`;

Deno.test("part2(example3)", () => {
  assertEquals(part2(example3), 4);
});

const example4 = `
..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........
`;

Deno.test("part2(example4)", () => {
  assertEquals(part2(example4), 4);
});

const example5 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`;

Deno.test("part2(example5)", () => {
  assertEquals(part2(example5), 10);
});

Deno.test("part2(input)", () => {
  assertEquals(part2(input), 303);
});
