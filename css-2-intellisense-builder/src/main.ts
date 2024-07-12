import { css2Intellisense } from "./utils/intellisense.builder";
import { IntellisenseItem } from "./utils/IntellisenseItem.type";
import fs from "node:fs/promises";

const fileLocations = [
  '../npm-package/css/custom.css',
  '../npm-package/css/grid.css',
  '../npm-package/css/utilities.css',
]
const distLocation = '../vscode-intellisense/src/intellisenseItems.json'

Promise.all(fileLocations.map(fl => parseFile(fl)))
  .then(intellisenseItemsOfFiles => intellisenseItemsOfFiles.flat(1))
  .then(intellisenseItems => removeDuplicates(intellisenseItems))
  .then(intellisenseItems => fs.writeFile(
    distLocation,
    JSON.stringify(intellisenseItems, null, 0)
  ))
  .catch(error => console.error(error));

async function parseFile(fileLocation: string): Promise<IntellisenseItem[]> {
  const css = await fs.readFile(fileLocation, { encoding: 'utf8' });
  return css2Intellisense(css);
}

// Unfortunately there are duplicates in Bootstraps css. So we remove them here
function removeDuplicates(intellisenseItems: IntellisenseItem[]): IntellisenseItem[] {
  const original = [...intellisenseItems];
  return intellisenseItems.filter((item, i) =>
    original.slice(i + 1).findIndex(originalItem => item.label === originalItem.label) === -1
  );
}
