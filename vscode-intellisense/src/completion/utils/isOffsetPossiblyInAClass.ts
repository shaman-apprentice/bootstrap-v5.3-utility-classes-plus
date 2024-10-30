export function isOffsetPossiblyInAClass(text: string, offset: number): boolean {
  while (--offset >= 0) {
    const c = text[offset];
    if (c === '"')
      return _isStartOfClassorClassNameValue(text, offset);
    if (c === "<" || c === ">")
      return false;
  }

  return false;
}

export const _isStartOfClassorClassNameValue = (text: string, offset: number) =>
  text.slice(offset - 6, offset).toLowerCase() === "class=" || text.slice(offset - 10, offset) === "className=";

// export const _isStartOfClassNameValue = (text: string, offset: number) =>
//   text.slice(offset - 9, offset).toLowerCase() === "className=";
