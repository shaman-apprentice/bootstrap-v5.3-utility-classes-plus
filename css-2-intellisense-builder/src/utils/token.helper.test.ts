import { describe, expect, test } from "@jest/globals";
import { findExcludingComments } from "./token.helper";

describe("token.helper", () => {
  test("it finds correct value", () => {
    const text = `.w-3 { width: 1rem; }`;
    const offset = 0;
    expect(findExcludingComments(text, /{/, offset)).toBe(5);
  })

  test("it honors offset", () => {
    const text = `.w-3 { width: 1rem; } .w-4 { width: 3rem; }`;
    const offset = 22;
    expect(findExcludingComments(text, /{/, offset)).toBe(27);
  })

  test("it gets not confused by line comments", () => {
    const text = `
// Some weird workaround
// for what ever reason
.w-3 {
  width: 1rem;
}`;
    const offset = 0;
    expect(findExcludingComments(text, /\S/, offset)).toBe(50);
  });

  test("it gets not confused by block comments", () => {
    const text = `
/**
 * Some weird comment including "{" and "}"
 */
.w-3 {
  width: 1rem;
}`;
    const offset = 0;
    expect(findExcludingComments(text, /{/, offset)).toBe(58);
  });
});
