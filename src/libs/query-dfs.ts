/**
 * @description Traverse Query Method
 * @private
 * @param {{ [key: string]: any; }} obj
 * @param {string} needle
 * @param {{ $eq: any; }} found
 * @param {string} target
 * @returns {{ target: string; query: { $eq: any; }}}
 */
export function traverse(
  obj: { [key: string]: any },
  needle: string,
  query: { $eq?: any },
  target?: string,
) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      if (
        typeof obj[key][needle] !== 'undefined' &&
        typeof obj[key][needle] !== 'object'
      ) {
        query = { $eq: obj[key][needle] };
        target = `${key}.${needle}`;
      } else {
        traverse(obj[key], needle, query, target);
      }
    }
  }
  return {
    target,
    query,
  };
}
