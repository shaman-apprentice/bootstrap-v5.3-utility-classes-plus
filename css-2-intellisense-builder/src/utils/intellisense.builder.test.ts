import { describe, expect, test } from "@jest/globals";
import { css2Intellisense } from "./intellisense.builder";

describe("intellisense.builder", () => {
  test("it can build one selector", () => {
    const css = `
.w-3 {
  width: 1rem;
}`;
    expect(css2Intellisense(css)).toEqual([
      {
        label: "w-3",
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
    expect(css2Intellisense(css)).toEqual([
      {
        label: "w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      },
      {
        label: "w-1rem",
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
    expect(css2Intellisense(css)).toEqual([
      {
        label: "w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      },
      {
        label: "w-1rem",
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
    expect(css2Intellisense(css)).toEqual([
      {
        label: "row-cols-auto > *",
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
    expect(css2Intellisense(css)).toEqual([
      {
        label: "w-1rem",
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
    expect(css2Intellisense(css)).toEqual([
      {
        label: "w-3",
        markdownDoc: `.w-3 {
  width: 1rem;
}`,
      }
    ]);
  });

  test("it works when css ends with a comment in same line", () => {
    const css = `.w-3 { width: 1rem; } /* TODO more rules */`;
    expect(css2Intellisense(css)).toEqual([{
      label: "w-3",
      markdownDoc: `.w-3 {
  width: 1rem;
}`
    }]);
  });

  describe("rules within context", () => {
    test("it can parse media queries", () => {
      const css = `
@media (min-width: 768px) {
  .d-md-inline {
    display: inline;
  }
}`
      expect(css2Intellisense(css)).toEqual([
        {
          label: "d-md-inline",
          markdownDoc: `@media (min-width: 768px) {
  .d-md-inline {
    display: inline;
  }
}`
        }
      ]);
    });

    test("it can parse multiple at rules", () => {
      const css = `
@layer bs {
  .container,
  .container-fluid {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
  }

  @media (min-width: 768px) {
    .container-md, .container-sm, .container {
      max-width: 720px;
    }
  }
}`
      const intellisenseItems = css2Intellisense(css);
      expect(intellisenseItems[0]).toEqual({
        label: "container",
        markdownDoc: `@layer bs {
  .container {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
  }
}`
      });

      expect(intellisenseItems.length).toBe(5);

      expect(intellisenseItems[3]).toEqual({
        label: "container-sm",
        markdownDoc: `@layer bs {
  @media (min-width: 768px) {
    .container-sm {
      max-width: 720px;
    }
  }
}`
      });
    });
  })
});
