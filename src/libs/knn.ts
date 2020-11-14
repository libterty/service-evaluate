
/**
 * @description Distance Measuring Function
 * @description ((d1 - e1)^2 + (d2 - e2)^2 ..)^1/2
 * @public
 * @param {number[]} ref
 * @param {number[]} target
 * @returns {number}
 */
export const distanceCalc = (ref: number[], target: number[]): number => {
  return Math.sqrt(
    ref
      .map((refPoint, i) => target[i] - refPoint)
      .reduce((sum, diff) => sum + (diff * diff), 0)
  );
}

/**
 * @classdesc K Nearest Neightbor
 */
export class KNN {
  public k: number;
  public data: number[][];
  public labels: number[];

  constructor(k = 1, data, labels) {
    this.k = k;
    this.data = data;
    this.labels = labels;
  }

  // to do go sleep first
}