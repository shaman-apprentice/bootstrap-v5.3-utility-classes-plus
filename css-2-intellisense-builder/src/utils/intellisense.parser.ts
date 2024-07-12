import { parseAtRule } from "./atRule.parser";
import { IntellisenseItem } from "./IntellisenseItem.type";
import { format } from "./markdown.helper";
import { findExcludingComments } from "./token.helper";

export type ParsedIntellisenseItems = {
  /** Offset where current parsing ended */
  nextOffset: number;
  items: IntellisenseItem[];
}

export function* intellisenseItems(
  css: string,
  offset = 0,
  /** e.g. when rules are in @media context */
  atContext: string[] = []
): Generator<ParsedIntellisenseItems> {
  const start = findExcludingComments(css, /\S/, offset);
  if (start < offset)
    return;

  if (css[start] === "@") {
    const parsedAtRule = parseAtRule(css, start);
    if (!parsedAtRule.isDeclaration)
      atContext.push(parsedAtRule.atRule);

    yield* intellisenseItems(css, parsedAtRule.nextOffset, atContext);
    return;
  }

  if (css[start] === "}") {
    if (atContext.length === 0)
      throw new Error(`Found closing "}" at unexpected offset "${offset}"`);
    else {
      atContext.pop();
      yield* intellisenseItems(css, start + 1, atContext);
      return;
    }
  }

  const startOfRuleContent = findExcludingComments(css, /{/, start + 1);
  const endOfRuleContent = findExcludingComments(css, /}/, startOfRuleContent + 1);

  const selectors: string[] = css
    .slice(start, startOfRuleContent)
    .split(",")
    .map(s => s.trim());
  const ruleContent = css.substring(startOfRuleContent + 1, endOfRuleContent);
  const nextOffset = endOfRuleContent + 2;

  yield {
    nextOffset,
    items: selectors.map(selector => ({
      label: selector.slice(1), // remove leading "." of class-selector
      markdownDoc: format(atContext, selector, ruleContent),
    }))
  }

  yield* intellisenseItems(css, nextOffset, atContext);
}
