import { describe, expect, test } from "@jest/globals";
import { parseRuleValues } from "./rule.parser";

describe("rule.parser", () => {
  test("it gets the content of single line rules", () => {
    const rule = `
.w-3 {
  width: 1rem;
}`;
    const offset = 5;
    expect(parseRuleValues(rule, offset)).toBe(`{
  width: 1rem;
}`    );
  });

  test("it gets the content of multiple line rules", () => {
    const rule = `
  .row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}`;
    const offset = 5;
    expect(parseRuleValues(rule, offset)).toBe(`{
  flex: 0 0 auto;
  width: auto;
}`    );
  });
});
