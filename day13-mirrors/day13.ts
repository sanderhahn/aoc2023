enum Reflection {
  None = 0,
  Perfect = 1,
  Smudged = 2,
}

type CompareFn = (top: string, bottom: string) => boolean;

class Panel {
  panel: string[];

  constructor(input: string) {
    this.panel = input.trim().split("\n");
  }

  compareSmudged(top: string, bottom: string): Reflection {
    let hasSmudge = false;
    for (let i = 0; i < top.length; i++) {
      if (top[i] !== bottom[i]) {
        if (hasSmudge) {
          return Reflection.None;
        }
        hasSmudge = true;
      }
    }
    if (hasSmudge) {
      return Reflection.Smudged;
    }
    return Reflection.Perfect;
  }

  isReflection(
    panel: string[],
    position: number,
    compare: CompareFn = (top, bottom) => top === bottom,
  ): boolean {
    position--;
    let otherSide = position + 1;
    while (position >= 0 && otherSide < panel.length) {
      const top = panel[position];
      const bottom = panel[otherSide];
      if (!compare(top, bottom)) {
        return false;
      }
      position--;
      otherSide++;
    }
    return true;
  }

  findReflection(panel: string[]): number {
    for (let i = 1; i < panel.length; i++) {
      if (this.isReflection(panel, i)) {
        return i;
      }
    }
    return 0;
  }

  findSmudgedReflection(panel: string[]): number {
    let hasSmudge = false;
    const compare = (top: string, bottom: string) => {
      const comparison = this.compareSmudged(top, bottom);
      switch (comparison) {
        case Reflection.None:
          return false;
        case Reflection.Perfect:
          return true;
        case Reflection.Smudged:
          if (hasSmudge) {
            return false;
          }
          hasSmudge = true;
          return true;
      }
    };

    for (let i = 1; i < panel.length; i++) {
      hasSmudge = false;
      if (this.isReflection(panel, i, compare) && hasSmudge) {
        return i;
      }
    }
    return 0;
  }

  getColumn(column: number): string {
    return this.panel.map((row) => row[column]).join("");
  }

  getFlipped(): string[] {
    const columns = [];
    for (let i = 0; i < this.panel[0].length; i++) {
      columns.push(this.getColumn(i));
    }
    return columns;
  }

  findReflections() {
    return {
      horizontal: this.findReflection(this.panel),
      vertical: this.findReflection(this.getFlipped()),
    };
  }

  findSmudgedReflections() {
    return {
      horizontal: this.findSmudgedReflection(this.panel),
      vertical: this.findSmudgedReflection(this.getFlipped()),
    };
  }
}

export function part1(input: string): number {
  let total = 0;
  const panels = input.trim().split("\n\n").map((panelInput) => {
    const panel = new Panel(panelInput);
    return panel.findReflections();
  });
  panels.forEach((panel) => {
    total += panel.horizontal * 100;
    total += panel.vertical;
  });
  return total;
}

export function part2(input: string): number {
  let total = 0;
  const panels = input.trim().split("\n\n").map((panelInput) => {
    const panel = new Panel(panelInput);
    const ref = panel.findReflections();
    const smudged = panel.findSmudgedReflections();
    if (
      ref.horizontal === smudged.horizontal && ref.vertical === smudged.vertical
    ) {
      throw new Error("internal error");
    }
    return panel.findSmudgedReflections();
  });
  panels.forEach((panel) => {
    total += panel.horizontal * 100;
    total += panel.vertical;
  });
  return total;
}
