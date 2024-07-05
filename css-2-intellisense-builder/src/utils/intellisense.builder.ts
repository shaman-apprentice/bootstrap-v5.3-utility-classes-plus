type IntellisenseItem = {
  /** display value and completion value */
  label: string;
  markdownDoc: string;
}

export function file2Intellisense(text: string): IntellisenseItem[] {
  const result: IntellisenseItem[] = []

  return result;
}

function parseNextRule(text: string, offset: number): { nextOffset: number, items: IntellisenseItem[] } | null {
  
  return null;
}

// todo test @media
// todo skip vars
