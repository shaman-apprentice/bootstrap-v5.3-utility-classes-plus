export type ParsedSelectors = {
  /** Offset where selector ends. E.g. in `.w-3 { 1.5rem }` it would be 4 */
  nextOffset: number;
  selectors: string[];
}
export function parseNextSelectors(text: string, offset: number): ParsedSelectors | null {
  const start = _findStartOfSelectors(text, offset);
  if (start === -1) return null;

  const end = _findEndOfSelectors(text, start);
  if (end === -1)
    throw new Error(`Could not find end of selectors after offset "${start}"`);

  const selectors = text
    .slice(start, end)
    .replace(/\s/g, "")
    .split(",")
  
  return {
    selectors,
    nextOffset: end,
  }
}

export function _findStartOfSelectors(text: string, offset: number): number {
  let start = offset + text.slice(offset).search(/\S/)
  if (start < offset) return -1;

  // check for comments
  const c = text[start];
  if (c === "/") {
    if (text[start + 1] === "*") {
      const endOfBlockComment = start + 2 + text.slice(start + 2).search(/\*\//);
      if (endOfBlockComment < start + 2)
        throw new Error(`Block comment started but has no end after offset "${start}"`);
      
      return _findStartOfSelectors(text, endOfBlockComment + 2);
    }

    if (text[start + 1] === "/") {
      const endOfLineComment = text.indexOf("\n", start + 1);
      if (endOfLineComment === -1)
        return -1;
      
      return _findStartOfSelectors(text, endOfLineComment + 1);
    }
  }

  return start;
}

/** Assumes for now, that there are no comments between selectors */
export function _findEndOfSelectors(text: string, offset: number) {
  return text.indexOf("{", offset);
}
