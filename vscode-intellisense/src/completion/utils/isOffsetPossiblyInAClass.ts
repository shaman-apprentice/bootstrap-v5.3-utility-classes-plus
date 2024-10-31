export function isOffsetPossiblyInAClass(text: string, offset: number): boolean {
  while (--offset >= 0) {
    const c = text[offset];
    if (c === '"')
      return _isStartOfClassOrClassNameValue(text, offset);
    if (c === "<" || c === ">")
      return false;
  }

  return false;
}

export const _isStartOfClassOrClassNameValue = (text: string, offset: number) =>
  text.slice(offset - 6, offset).toLowerCase() === "class=" || text.slice(offset - 10, offset) === "className=";
