import { describe, expect, test } from "@jest/globals";
import { _isStartOfClassOrClassNameValue, isOffsetPossiblyInAClass } from "./isOffsetPossiblyInAClass";

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

  test("it doesn't confuse parent's class tag", () => {
    const documentText = `<div class="mt-2"></div>`;
    const offset = 18;
    expect(isOffsetPossiblyInAClass(documentText, offset)).toBe(false);
  })

  test("it stops early at opening and closing tags", () => {
    const documentText = `<p>class="</p>`;
    const offset = 14;
    expect(isOffsetPossiblyInAClass(documentText, offset)).toBe(false);
  })

  describe("bootstrap utility css classes", () => {
    test('it recognizes when "class" attr is used', () => {
      const documentText = `<div class=""></div>`;
      const offset = 11;
      expect(_isStartOfClassOrClassNameValue(documentText, offset)).toBe(true);
    })

    test('it recognizes when "className" attr is used', () => {
      const documentText = `<div className=""></div>`;
      const offset = 15;
      expect(_isStartOfClassOrClassNameValue(documentText, offset)).toBe(true);
    })

    test('it recognizes when primeng\'s "styleClass" attr is used', () => {
      const documentText = `<div styleClass=""></div>`;
      const offset = 16;
      expect(_isStartOfClassOrClassNameValue(documentText, offset)).toBe(true);
    })
  })
});
