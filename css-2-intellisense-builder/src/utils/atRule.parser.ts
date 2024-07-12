import { findExcludingComments } from "./token.helper";

type ParsedAtRule =
  { isDeclaration: true, nextOffset: number; }
  | { isDeclaration: false, nextOffset: number; atRule: string }

export function parseAtRule(text: string, offset: number): ParsedAtRule {
  const nextSemicolon = findExcludingComments(text, /;/, offset + 1);
  const nextOpeningBracket = findExcludingComments(text, /{/, offset + 1);
  if (nextSemicolon === -1 && nextOpeningBracket === -1)
    throw new Error(`Invalid @-rule at offset "${offset}". Expected to find a ";" or "{".`);

  const isDeclaration = nextSemicolon === -1 || nextSemicolon < nextOpeningBracket;
  return isDeclaration
    ? {
      isDeclaration,
      nextOffset: nextSemicolon + 1,
    }
    : {
      isDeclaration,
      nextOffset: nextOpeningBracket + 1,
      atRule: text.substring(offset, nextOpeningBracket).trimEnd(),
    }
}
