import { findExcludingComments } from "./token.helper";

/** 
 * Note that only single @layer and single @media is implemented so far.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule for is needed for full support.
 */
export function findEndOfAtRule(text: string, offset: number): number {
  if (text.startsWith("@media", offset)) {
    const end = findExcludingComments(text, /{/, offset + 1);
    if (end === -1)
      throw new Error(`Given @media-rule at offset "${offset}" has no content`);

    return end;
  }

  // if (text.startsWith("@layer"))

  throw new Error(`Given @-rule at offset "${offset}" isn't supported yet.`);
}

function isDeclOfLayer(text: string, offset: number) {
  const nextSemicolon = findExcludingComments(text, /;/, offset + 1);
  if (nextSemicolon === -1) return false;

  const nextOpeningBracket = findExcludingComments(text, /{/, offset + 1);

  return nextOpeningBracket < nextSemicolon;
}