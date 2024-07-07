import { IntellisenseItem } from "./IntellisenseItem.type";
import { intellisenseItems } from "./intellisense.parser"

export function file2Intellisense(text: string): IntellisenseItem[] {
  const result: IntellisenseItem[] = [];

  for (const intellisenseItem of intellisenseItems(text))
    result.push(...intellisenseItem.items);

  return result;
}
