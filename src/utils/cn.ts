/**
 * cn (class names) utility function
 *
 * How does it work?
 * - Accepts any number of arguments (strings, numbers, booleans, arrays, or objects).
 * - Skips falsy values (false, null, undefined, 0, '') except 0 (handled as a string).
 * - Strings and numbers are added as-is.
 * - Arrays are recursively flattened and processed.
 * - Objects: each property whose value is truthy has its key included as a class.
 * - Returns space-separated string of classes.
 */

type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassDictionary
  | ClassArray;

type ClassDictionary = Record<string, boolean>;
type ClassArray = ClassValue[];

/**
 * Example usage:
 * cn("foo", {"bar": true, "baz": false}, ["a", "b", {c: 1}])
 * // returns "foo bar a b c"
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
