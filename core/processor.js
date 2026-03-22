import { parseUtility } from "./parser.js";

export function processElement(el) {
  const toRemove = [];
  const styles = {};

  for (const cls of Array.from(el.classList)) {
    if (!cls.startsWith("chai-")) continue;

    const utility = cls.slice(5);
    const css = parseUtility(utility);

    if (css) {
      Object.assign(styles, css);
    }

    toRemove.push(cls);
  }

  Object.assign(el.style, styles);

  toRemove.forEach((cls) => el.classList.remove(cls));
}

export function processDOM(root = document) {
  const elements = root.querySelectorAll('[class*="chai-"]');

  elements.forEach((el) => processElement(el));

  if (root.nodeType === 1 && root.className.includes("chai-")) {
    processElement(root);
  }
}
