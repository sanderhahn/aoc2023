function cardStrength(card: string): number {
  return "23456789TJQKA".indexOf(card[0]);
}

type Pair = [number, string];
type Rank = {
  pairs: Pair[];
  hand: string[];
};

function comparePair(pair1: Pair, pair2: Pair): number {
  const [count1, card1] = pair1;
  const [count2, card2] = pair2;
  if (count1 !== count2) {
    return count2 - count1;
  }
  if (card1 !== card2) {
    return cardStrength(card2) - cardStrength(card1);
  }
  return 0;
}

function rankHand(hand: string[]): Rank {
  const grouping = hand.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pairs: Pair[] = Object.entries(grouping).map((
    [card, count],
  ) => [count, card]);
  pairs.sort(comparePair);

  return {
    pairs,
    hand,
  };
}

function compareHands(hand1: Rank, hand2: Rank, withJokers = false): number {
  let i = 0;
  const [pairs1, pairs2] = [hand1.pairs, hand2.pairs];
  while (i < pairs1.length && i < pairs2.length) {
    const [count1] = pairs1[i];
    const [count2] = pairs2[i];
    if (count1 !== count2) {
      return count1 - count2;
    }
    i++;
  }
  for (let i = 0; i < hand1.hand.length; i++) {
    const card1 = hand1.hand[i];
    const card2 = hand2.hand[i];
    if (card1 !== card2) {
      if (withJokers) {
        return cardStrength2(card1) - cardStrength2(card2);
      }
      return cardStrength(card1) - cardStrength(card2);
    }
  }
  return 0;
}

function parseGame(input: string): { cards: string[]; bid: number }[] {
  return input.trim().split("\n")
    .map((line) => {
      const [handString, bidString] = line.split(" ");
      const cards = handString.split("");
      const bid = parseInt(bidString, 10);
      return { cards, bid };
    });
}

function calculateTotal(game: { bid: number }[]): number {
  let total = 0;
  game.forEach(({ bid }, rank) => {
    total += (rank + 1) * bid;
  });
  return total;
}

export function part1(input: string): number {
  const game = parseGame(input)
    .map(({ cards, bid }) => ({
      rankCards: rankHand(cards),
      bid,
    }));
  game.sort((hand1, hand2) => compareHands(hand1.rankCards, hand2.rankCards));

  return calculateTotal(game);
}

function cardStrength2(card: string): number {
  return "J23456789TQKA".indexOf(card[0]);
}

function tryJokers(
  pairs: Pair[],
  jokers: number,
  hand: string[],
): { pairs: Pair[]; hand: string[] } {
  if (pairs.length === 0) {
    return {
      pairs: [[jokers, "J"]],
      hand,
    };
  }
  const allHands = [];
  for (let i = 0; i < pairs.length; i++) {
    const newPair = [...pairs];
    newPair[i] = [newPair[i][0] + jokers, newPair[i][1]];
    newPair.sort(comparePair);
    allHands.push({
      pairs: newPair,
      hand,
    });
  }
  allHands.sort((hand1, hand2) => compareHands(hand1, hand2, true));
  return allHands.at(-1)!;
}

function rankHand2(hand: string[]): Rank {
  const grouping = hand.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const jokers = grouping["J"] || 0;
  delete grouping["J"];

  const pairs: Pair[] = Object.entries(grouping).map((
    [card, count],
  ) => [count, card]);

  const bestHand = tryJokers(pairs, jokers, hand);

  return bestHand;
}

export function part2(input: string): number {
  const game = parseGame(input)
    .map(({ cards, bid }) => ({
      rankCards: rankHand2(cards),
      bid,
    }));

  game.sort((hand1, hand2) =>
    compareHands(hand1.rankCards, hand2.rankCards, true)
  );

  return calculateTotal(game);
}
