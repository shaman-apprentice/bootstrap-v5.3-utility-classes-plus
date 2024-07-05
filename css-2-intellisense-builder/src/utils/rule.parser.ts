export function parseRuleValues(text: string, offset: number): string {
  // todo exclude "{" and "}" from comments
  const start = text.indexOf("{", offset);
  const end = text.indexOf("}", offset);
  if (start === -1 || end === -1)
    throw new Error(`Could not find rule content after offset "${offset}"`);
  return text.substring(start, end + 1);
}
