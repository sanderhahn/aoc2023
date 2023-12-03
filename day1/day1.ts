export function part1(input: string): number {
  return input
    .split("\n")
    .map((line) => {
      const digits = line.replace(/\D/g, "");
      return digits[0] + digits[digits.length - 1];
    })
    .map((value) => parseInt(value, 10))
    .reduce(
      (sum, value) => sum + value,
      0,
    );
}

function reverse(s: string): string {
  return s.split("").reverse().join("");
}

const wordToDigit: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const digits = new RegExp(`([0-9]|${Object.keys(wordToDigit).join("|")})`);

const reversedWordToDigit = Object.fromEntries(
  Object.entries(wordToDigit).map(([key, value]) => [reverse(key), value]),
);

const reversedDigits = new RegExp(
  `([0-9]|${Object.keys(reversedWordToDigit).join("|")})`,
);

export function part2(input: string): number {
  return input
    .split("\n")
    .map((line) => {
      const firstDigit = line.match(digits);
      if (!firstDigit) {
        throw new Error(`No digit found in ${line}`);
      }
      const reversedLine = reverse(line);
      const lastDigit = reversedLine.match(reversedDigits);
      if (!lastDigit) {
        throw new Error(`No last digit found in ${line}`);
      }
      const first = firstDigit[1].length === 1
        ? firstDigit[1]
        : wordToDigit[firstDigit[1]];
      const last = lastDigit[1].length === 1
        ? lastDigit[1]
        : reversedWordToDigit[lastDigit[1]];
      return first + last;
    })
    .map((value) => parseInt(value, 10))
    .reduce(
      (sum, value) => sum + value,
      0,
    );
}
