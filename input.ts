function envKeyInput(path: string): string {
  const dayNumber = path.match(/\d+/)?.[0];
  const envKey = `DAY${dayNumber}_INPUT`;
  return envKey;
}

export function loadInput(path: string): string {
  const filepath = `${path}/input.txt`;
  try {
    return Deno.readTextFileSync(`${path}/input.txt`);
  } catch (e) {
    // fallback to env var for continuous integration
    const envKey = envKeyInput(path);
    if (Deno.env.has(envKey)) {
      return Deno.env.get(envKey)!;
    }
    if (e instanceof Deno.errors.NotFound) {
      throw new Error(`Could not find input file at ${filepath}`);
    }
    throw e;
  }
}
