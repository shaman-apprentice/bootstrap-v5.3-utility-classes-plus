import { describe, expect, test } from "@jest/globals";
import { format } from "./markdown.helper";

describe("markdown.helper", () => {
  test("it splits rule content with multiple rules in one line into multiple lines", () => {
    const atContext = [] as string[];
    const selector = ".text-lg";
    const ruleContent = " font-size: 1.125rem; line-height: 1.75rem; ";
    expect(format(atContext, selector, ruleContent)).toBe(`.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}`)
  });
});
