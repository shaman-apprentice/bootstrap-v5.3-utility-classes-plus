import { IntellisenseItem } from "./IntellisenseItem.type";
import { findExcludingComments } from "./token.helper";

export type ParsedIntellisenseItems = {
  /** Offset where current parsing ended */
  nextOffset: number;
  items: IntellisenseItem[];
}

export function* intellisenseItems(
  css: string,
  offset = 0,
  /** For now, assume no nested contexts like `@layer @media ...`  */
  currentContext: string | null = null
): Generator<ParsedIntellisenseItems> {
  const start = findExcludingComments(css, /\S/, offset);
  if (start < offset)
    return;

  const startOfRuleContent = findExcludingComments(css, /{/, start + 1);
  const endOfRuleContent = findExcludingComments(css, /}/, startOfRuleContent + 1);

  const selectors: string[] = css
    .slice(start, startOfRuleContent)
    .split(",")
    .map(s => s.trim());
  const ruleContent = css.substring(startOfRuleContent, endOfRuleContent + 1);
  const nextOffset = endOfRuleContent + 2;

  debugger;

  yield {
    nextOffset,
    items: selectors.map(selector => ({
      label: selector,
      markdownDoc: `${selector} ${ruleContent}`,
    }))
  }

  yield* intellisenseItems(css, nextOffset);
}
