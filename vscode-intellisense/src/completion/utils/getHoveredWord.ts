const wordBoundaryRegExp = /[\s"]/;

export function getHoveredWord(text: string, offset: number): string | null {
  const p = { start: offset, end: offset };

  while (p.start >= 0) {
    if (wordBoundaryRegExp.test(text[p.start - 1]))
      break;

    p.start -= 1;
  }

  while (p.end < text.length) {
    if (wordBoundaryRegExp.test(text[p.end + 1]))
      break;

    p.end += 1;
  }

  if (p.start === -1 || p.end === text.length || p.start === p.end)
    return null;

  const word = text.slice(p.start, p.end + 1);
  return word.length === 0
    ? null
    : word;
}
