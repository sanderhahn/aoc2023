import { assertEquals } from "std/assert/assert_equals.ts";
import { part1, part2 } from "./day5.ts";
import { loadInput } from "../input.ts";
const input = loadInput("day5-seeds/input.txt");

const example = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

Deno.test("part1(example)", () => {
  assertEquals(part1(example), 35);
});

Deno.test("part1(input)", () => {
  assertEquals(part1(input), 323142486);
});

Deno.test("part2(example)", () => {
  assertEquals(part2(example), 46);
});

// Deno.test("part2(input)", () => {
//   assertEquals(part2(input), 79874951);
// });
