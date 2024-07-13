# bootstrap-v5.3-utility-classes-plus

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

This project provides utility classes based on [Bootstrap v5.3.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/). It can be used with or without Bootstrap.

## Usage

After `npm i @shaman-apprentice/bootstrap-v5.3-utility-classes-plus` you can import styles from *node_modules/@shaman-apprentice/bootstrap-v5.3-utility-classes-plus/dist/index.css* into your app.

[bootstrap-v5-3-utility-classes-plus-intellisense](https://marketplace.visualstudio.com/items?itemName=shaman-apprentice.bootstrap-v5-3-utility-classes-plus-intellisense) provides intellisense for vscode.

For documentation refer to the Layout section of official [Bootstrap documentation](https://getbootstrap.com/docs/5.3/layout/utilities/). Be aware that not all css rules are integrated in this library. **In addition to Bootstrap's utility classes, you can use the custom utility classes defined in [custom.css](https://github.com/shaman-apprentice/bootstrap-v5.3-utility-classes-plus/blob/main/npm-package/css/custom.css).**

## Motivation

Imagine a software landscape with many different frontend frameworks like Bootstrap, Material, PrimeNg, ... with Bootstrap having the biggest parts.

Switching to one framework pays off in the long term. Having one set of utility classes is also beneficial.

Therefore, this project extracts the utility classes from Bootstrap and removes all style related rules from them. Its goal is to be usable with all frameworks. It should help with the migration to one framework and keep being useful afterwards.

## Contribution

This project is build with Angular in mind. If it doesn't fit your needs, feel free to open an issue. I am open for enhancements.

## Acknowledgements

As the utility classes are based on Bootstrap v5.3.3, this project wants to give a huge thank you to the Bootstrap team for their hard work and contributions to the open-source community ♥
