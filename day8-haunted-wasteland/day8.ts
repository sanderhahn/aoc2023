function parseInput(input: string): Document {
  const [sequence, nodes] = input.trim().split("\n\n");
  const graph = new Map<string, Node>();
  for (const node of nodes.split("\n")) {
    const [name, pair] = node.split(" = ");
    const [left, right] = pair.substring(1, pair.length - 1).split(", ");
    graph.set(name, {
      left,
      right,
    });
  }
  return {
    sequence,
    graph,
  };
}

interface Node {
  left: string;
  right: string;
}

type Graph = Map<string, Node>;

interface Document {
  sequence: string;
  graph: Graph;
}

function step({ graph }: Document, start: string, direction: string): string {
  if (direction === "L") {
    return graph.get(start)!.left;
  } else if (direction === "R") {
    return graph.get(start)!.right;
  }
  throw new Error("Invalid direction");
}

function traverse(document: Document, start: string): string {
  const { sequence } = document;
  return sequence.split("").reduce((acc, direction) => {
    return step(document, acc, direction);
  }, start);
}

export function part1(input: string): number {
  const document = parseInput(input);
  const { sequence } = document;
  const start = "AAA";
  const end = "ZZZ";
  let current = start;
  let steps = 0;
  while (current !== end) {
    current = traverse(document, current);
    steps += sequence.length;
  }
  return steps;
}

export function part2(input: string): number {
  const document = parseInput(input);
  const { sequence, graph } = document;
  const names = [...graph.keys()];

  const fastMovement = new Map();
  names.forEach((source) => {
    const destination = traverse(document, source);
    fastMovement.set(source, destination);
  });

  function calculateSteps(start: string) {
    let steps = 0;
    let end = start;
    while (!end.endsWith("Z")) {
      end = fastMovement.get(end);
      steps += 1;
    }
    return steps;
  }

  const starts = names.filter((name) => name.endsWith("A"));
  const steps = starts.map((start) => calculateSteps(start));
  const total = steps.reduce((acc, steps) => acc * steps, 1);
  return total * sequence.length;
}
