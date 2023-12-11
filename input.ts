function envKeyInput(path: string): string {
  const dayNumber = path.match(/\d+/)?.[0];
  const envKey = `DAY${dayNumber}_INPUT`;
  return envKey;
}

export function loadInput(filepath: string): string {
  try {
    return Deno.readTextFileSync(filepath);
  } catch (e) {
    // fallback to env var for continuous integration
    const envKey = envKeyInput(filepath);
    if (Deno.env.has(envKey)) {
      return Deno.env.get(envKey)!;
    }
    if (e instanceof Deno.errors.NotFound) {
      throw new Error(`Could not find input file at ${filepath}`);
    }
    throw e;
  }
}
