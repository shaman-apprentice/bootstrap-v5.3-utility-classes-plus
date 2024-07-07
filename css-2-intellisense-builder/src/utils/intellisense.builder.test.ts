import { describe, expect, test } from "@jest/globals";
import { file2Intellisense } from "./intellisense.builder";

describe("intellisense.builder", () => {
  test("it can build one selector", () => {
    const css = `
.w-3 {
  width: 1rem;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      }
    ]);
  });

  test("it can parse multiple selectors in one line", () => {
    const css = `.w-3, .w-1rem {
  width: 1rem;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      },
      {
        label: ".w-1rem",
        markdownDoc: `.w-1rem {
  width: 1rem;
}`,
      }
    ]);
  });

  test("it can parse multiple selectors in multiple lines", () => {
    const css = `.w-3,
.w-1rem {
  width: 1rem;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      },
      {
        label: ".w-1rem",
        markdownDoc: `.w-1rem {
  width: 1rem;
}`,
      }
    ]);
  });

  test("it gets the content of multiple line rules", () => {
    const css = `
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".row-cols-auto > *",
        markdownDoc: `.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}`
      }
    ]);
  });

  test("it ignores out commented selectors", () => {
    const css = `// .w-3,
.w-1rem {
  width: 1rem;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".w-1rem",
        markdownDoc: `.w-1rem {
  width: 1rem;
}`,
      }
    ]);
  });

  test("it ignores out commented rules", () => {
    const css = `
/** don't explicit state unit for now, until ADR XYZ is decided
.w-1rem {
  width: 1rem;
}
*/

.w-3 {
  width: 1rem;
}`;
    expect(file2Intellisense(css)).toEqual([
      {
        label: ".w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      }
    ]);
  })
});

