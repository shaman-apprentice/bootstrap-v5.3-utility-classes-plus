import { describe, expect, test } from "@jest/globals";
import { _isStartOfClassValue, isOffsetPossiblyInAClass } from "./isOffsetPossiblyInAClass";

describe("isOffsetPossiblyInAClass", () => {
  test("it recognizes empty class attr", () => {
    const documentText = `<div class=""></div>`;
    const offset = 12;
    expect(isOffsetPossiblyInAClass(documentText, offset)).toBe(true);
  });

  test("it rejects non class attr", () => {
    const documentText = `<div data-x="2" class=""></div>`;
    const offset = 13;
    expect(isOffsetPossiblyInAClass(documentText, offset)).toBe(false);
  });

  describe("_isStartOfClassValue", () => {
    test('it recognizes "class" attr', () => {
      const documentText = `<div class=""></div>`;
      const offset = 11;
      expect(_isStartOfClassValue(documentText, offset)).toBe(true);
    })

    test('it recognizes primeng\'s "styleClass" attr', () => {
      const documentText = `<div styleClass=""></div>`;
      const offset = 16;
      expect(_isStartOfClassValue(documentText, offset)).toBe(true);
    })
  })
});
