export function isOffsetPossiblyInAClass(text: string, offset: number): boolean {
  let pointer = offset;

  while (--pointer >= 0) {
    if (text[pointer] === '"')
      return _isStartOfClassValue(text, pointer);
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
