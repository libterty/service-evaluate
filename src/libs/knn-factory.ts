import KNNSimple from './knn';

/**
 * @classdesc K Nearest Neighbor Factory Function
 */
export class KNNFactory {
  /**
   * @description Entry Points for create KNN Result Base on Algo you choose
   * @description Currently only have no optimize calculate
   * @param {"simple" | "advance"} type
   * @param {number} k
   * @param {number[][]} data
   * @param {string[]} labels
   */
  static createResult(
    type: string,
    k: number,
    data: number[][],
    labels: string[],
  ): KNNSimple {
    switch (type) {
      case 'simple':
        return new KNNSimple(k, data, labels);
      case 'advance':
        // todo
        return;
    }
  }
}

import KNNData from '../../public/knn/price-rate-example.json';
const data = KNNData.sample;
/**
 * @description data.data is a dataset collection containing average rate with trading amounts (rent total amount) the datset is formed as metrix
 * @description data.lables is the label that represents collection of data.data is being traded or not, in here i use `resolve` as trade `reject` as not trade
 */
const knn = KNNFactory.createResult('simple', 5, data.data, data.labels);
console.log(knn.predict([6, 6500]));
