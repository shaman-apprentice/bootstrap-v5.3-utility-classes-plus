export function findExcludingComments(text: string, regex: RegExp, offset: number): number {
  const find = offset + text.slice(offset).search(regex);
  if (find < offset)
    return -1;

  const nextCommentStart = findStartOfNextComment(text, offset);
  if (nextCommentStart !== -1) {
    const nextCommentEnd = findEndOfComment(text, nextCommentStart);
    const isFindCommentStart = offset === nextCommentStart;
    const isFindWithinComment = find < nextCommentEnd;
    if (isFindCommentStart || isFindWithinComment)
      return findExcludingComments(text, regex, nextCommentEnd);
  }

  return find;
}

function findStartOfNextComment(text: string, offset: number): number {
  const nextLineComment = text.indexOf("//", offset);
  const nextBlockComment = text.indexOf("/*", offset);
  if (nextLineComment === -1) return nextBlockComment;
  if (nextBlockComment === -1) return nextLineComment;
  return Math.min(nextLineComment, nextBlockComment);
}

function findEndOfComment(text: string, offset: number): number {
  if (isLineComment(text, offset)) {
    const endOfLineComment = text.indexOf("\n", offset + 2);
    return endOfLineComment === -1
      ? text.length - 1
      : endOfLineComment;
  }

  if (isBlockComment(text, offset)) {
    const endOfBlockComment = text.indexOf("*/", offset + 2);
    if (endOfBlockComment < offset + 2)
      throw new Error(`Block comment started but has no end after offset "${offset}"`);
    return endOfBlockComment + 2;
  }

  throw new Error(`Given offset "${offset}" is not the start of a comment`);
}

function isLineComment(text: string, offset: number): boolean {
  return text[offset] === "/" && (text[offset + 1] === "/");
}

function isBlockComment(text: string, offset: number): boolean {
  return text[offset] === "/" && (text[offset + 1] === "*");
}
