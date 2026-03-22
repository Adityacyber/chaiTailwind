/**
 * Parse a single utility string (without the `chai-` prefix)
 * and return a CSS properties object, or null if unknown.
 */

import { rules } from "../rules/rules.js";

export function parseUtility(utility) {
  for (const rule of rules) {
    const match = utility.match(rule.test);

    if (match) {
      try {
        return rule.apply(match);
      } catch (e) {
        console.error(`[chai] Error in "${utility}"`, e);
        return null;
      }
    }
  }

  return null;
}
