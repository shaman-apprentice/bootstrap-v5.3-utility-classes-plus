export function format(atContext: string[], selector: string, ruleContent: string): string {
  let result = "";
  let level = 0;

  for (const atRule of atContext) {
    result += `${indent(level)}${atRule} {\n`;
    level += 1;
  }

  result += `${indent(level)}${selector}`;

  result += " {\n";
  level += 1;
  ruleContent.split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .forEach(line => {
      result += `${indent(level)}${line.trim()}\n`;
    });
  level -= 1;
  result += `${indent(level)}}`

  for (const _ of atContext) {
    level -= 1;
    result += `\n${indent(level)}}`;
  }

  return result;
}

function indent(times: number) {
  return "  ".repeat(times);
}
