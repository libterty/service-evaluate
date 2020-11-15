interface IMap {
  index: number;
  distance: number;
  label: string;
}

interface IVoteCount {
  [key: string]: any;
}

interface IPredict {
  label: string;
  voteCounts: IVoteCount;
  votes: IMap[];
}

/**
 * @description Distance Measuring Function
 * @description $$\sqrt{\sum_{i = 1}^n\ (xi -yi)^2}$$
 * @private
 * @param {number[]} ref
 * @param {number[]} target
 * @returns {number}
 */
const distanceCalc = (ref: number[], target: number[]): number => {
  return Math.sqrt(
    ref
      .map((refPoint, i) => target[i] - refPoint)
      .reduce((sum, diff) => sum + diff * diff, 0),
  );
};

/**
 * @classdesc K Nearest Neightbor
 */
export default class KNNSimple {
  public k: number;
  public data: number[][];
  public labels: string[];

  constructor(k = 1, data, labels) {
    this.k = k;
    this.data = data;
    this.labels = labels;
  }

  /**
   * @description Generate Map
   * @private
   * @param {number[]} point
   * @returns {IMap[]}
   */
  private generateMap(point: number[]): IMap[] {
    const map: IMap[] = [];
    let maxDistanceMap: number;
    const len = this.data.length;
    for (let i = 0; i < len; i++) {
      const otherPoint: number[] = this.data[i];
      const otherPointLabel: string = this.labels[i];
      const thisDistance: number = distanceCalc(point, otherPoint);

      if (!maxDistanceMap || thisDistance < maxDistanceMap) {
        // only adding nearest item
        map.push({
          index: i,
          distance: thisDistance,
          label: otherPointLabel,
        });

        map.sort((prev, next) => (prev.distance < next.distance ? -1 : 1));
      }

      // if the map is too long droping the fatest item
      if (map.length > this.k) map.pop();

      // update for next round comparsion
      maxDistanceMap = map[map.length - 1].distance;
    }

    return map;
  }

  /**
   * @description Prediction with K Nearest Neighbor Methods
   * @public
   * @param {number[]} point
   * @returns {IPredict}
   */
  public predict(point: number[]): IPredict {
    const map: IMap[] = this.generateMap(point);
    const votes: IMap[] = map.slice(0, this.k);

    const voteCounts: IVoteCount = votes.reduce((obj, vote: IMap) => {
      return Object.assign({}, obj, {
        [vote.label]: (obj[vote.label] || 0) + 1,
      });
    }, {});

    const sortedVote = Object.keys(voteCounts)
      .map(label => ({ label, count: voteCounts[label] }))
      .sort((prev, next) => (prev.count > next.count ? -1 : 1));

    return {
      label: sortedVote[0].label,
      voteCounts,
      votes,
    };
  }
}
