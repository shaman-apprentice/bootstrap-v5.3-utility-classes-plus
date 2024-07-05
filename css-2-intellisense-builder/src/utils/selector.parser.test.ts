import { describe, expect, test } from "@jest/globals";
import { _findStartOfSelectors, parseNextSelectors } from "./selector.parser";

describe("selector.parser", () => {
  describe("parseNextSelectors", () => {
    test("it can parse one selector", () => {
      const rule = `.w-3 {
  width: 1rem;
}`;
      const offset = 0;
      expect(parseNextSelectors(rule, offset)).toEqual({
        selectors: [".w-3"],
        nextOffset: 5,
      });
    })

    test("it can parse multiple selectors in one line", () => {
      const rule = `.w-3, .w-1rem {
  width: 1rem;
}`;
      const offset = 0;
      expect(parseNextSelectors(rule, offset)).toEqual({
        selectors: [".w-3", ".w-1rem"],
        nextOffset: 14,
      });
    })
  });

    test("it can parse multiple selectors in multiple lines", () => {
      const rule = `.w-3, .w-1rem,
.w-one-rem {
  width: 1rem;
}`;
      const offset = 0;
      expect(parseNextSelectors(rule, offset)).toEqual({
        selectors: [".w-3", ".w-1rem", ".w-one-rem"],
        nextOffset: 26,
      });
    })

    test("it gets not confused by block comments", () => {
      const rule = `
/*
 * Some weird workaround 
 */
.w-3 {
  width: 1rem;
}
      `;
      const offset = 0;
      expect(parseNextSelectors(rule, offset)).toEqual({
        selectors: [".w-3"],
        nextOffset: 39,
      });
    });

    test("it gets not confused by line comments", () => {
      const rule = `
// Some weird workaround
// for what ever reason
.w-3 {
  width: 1rem;
}
      `;
      const offset = 0;
      expect(parseNextSelectors(rule, offset)).toEqual({
        selectors: [".w-3"],
        nextOffset: 55,
      });
    });
  });

  describe("_findStartOfSelectors", () => {
    test("it finds the start of a selector in same line", () => {
        const rule = `.w-3 {
  width: 1rem;
}`;
        const offset = 0;
        expect(_findStartOfSelectors(rule, offset)).toBe(0);
    })

    test("it finds the start of a selector in next line", () => {
      const rule = `
.w-3 {
  width: 1rem;
}`;
      const offset = 0;
      expect(_findStartOfSelectors(rule, offset)).toBe(1);
  })
});
