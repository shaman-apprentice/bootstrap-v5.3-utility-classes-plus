import { IntellisenseItem } from "./IntellisenseItem.type";
import { intellisenseItems } from "./intellisense.parser"

export function css2Intellisense(css: string): IntellisenseItem[] {
  const result: IntellisenseItem[] = [];

  for (const intellisenseItem of intellisenseItems(css))
    result.push(...intellisenseItem.items);

  return result;
}
