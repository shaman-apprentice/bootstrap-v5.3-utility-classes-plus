export function isOffsetPossiblyInAClass(text: string, offset: number): boolean {
  while (--offset >= 0) {
    const c = text[offset];
    if (c === '"')
      return _isStartOfClassValue(text, offset);
    if (c === "<" || c === ">")
      return false;
  }

  return false;
}

export function _isStartOfClassValue(text: string, offset: number): boolean {
  if (text[--offset]?.toLowerCase() !== "=") return false;
  if (text[--offset]?.toLowerCase() !== "s") return false;
  if (text[--offset]?.toLowerCase() !== "s") return false;
  if (text[--offset]?.toLowerCase() !== "a") return false;
  if (text[--offset]?.toLowerCase() !== "l") return false;
  if (text[--offset]?.toLowerCase() !== "c") return false;
  return true;
}
