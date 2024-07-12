import { describe, expect, test } from "@jest/globals";
import { getHoveredWord } from "./getHoveredWord";

describe("getHoveredWord", () => {
  test("it finds single class", () => {
    const documentText = `<div class="d-flex"></div>`;
    const offset = 14;
    expect(getHoveredWord(documentText, offset)).toBe("d-flex");
  });

  test("it returns null for empty class", () => {
    const documentText = `<div class=""></div>`;
    const offset = 12;
    expect(getHoveredWord(documentText, offset)).toBe(null);
  })

  test("it finds middle class", () => {
    const documentText = `<div class="fst snd thd"></div>`;
    const offset = 17;
    expect(getHoveredWord(documentText, offset)).toBe("snd");
  })

  test("it finds class multi line classes", () => {
    const documentText = `<div
      class="
        fst
        snd
        thd"
      ></div>`;
    const offset = 28;
    expect(getHoveredWord(documentText, offset)).toBe("fst");
  });

  test("it returns null for hovered whitespace", () => {
    const documentText = `<div
      class="
        fst
        snd
        thd"
      ></div>`;
    const offset = 34;
    expect(getHoveredWord(documentText, offset)).toBe(null);
  })
});
