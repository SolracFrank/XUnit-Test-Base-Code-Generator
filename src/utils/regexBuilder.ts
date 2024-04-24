export function combineRegexes(...regexes: RegExp[]) {
  const combinedPattern = regexes.map((r) => r.source).join("|");
  return new RegExp(combinedPattern, "g");
}
