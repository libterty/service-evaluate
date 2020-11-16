import * as IKDTree from './interfaces';
/*
 * Original code from:
 *
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

class KDNode {
  public obj: IKDTree.TKDNodeObj;
  public dimensions: any;
  public parent: IKDTree.IKDNode;
  public left: any;
  public right: any;

  constructor(
    obj: IKDTree.TKDNodeObj,
    dimensions: IKDTree.TDimension,
    parent: IKDTree.IKDNode,
  ) {
    this.obj = obj;
    this.dimensions = dimensions;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

function toJSONImpl(src: IKDTree.IKDNode) {
  const dest = new KDNode(src.obj, src.dimensions, null);
  if (src.left) dest.left = toJSONImpl(src.left);
  if (src.right) dest.right = toJSONImpl(src.right);
  return dest;
}

/**
 *
 * @param points
 * @param depth
 * @param parent
 * @param dimensions
 */
function buildTree(
  points: IKDTree.TPoint,
  depth: number,
  parent: IKDTree.IKDNode | null,
  dimensions: any[],
) {
  const dim = depth % dimensions.length;

  if (points.length === 0) return null;
  if (points.length === 1) return new KDNode(points[0], dim, parent);

  points.sort((prev, next) => prev[dimensions[dim]] - next[dimensions[dim]]);

  const median = Math.floor(points.length / 2);
  const node = new KDNode(points[median], dim, parent);
  node.left = buildTree(points.slice(0, median), depth + 1, node, dimensions);
  node.right = buildTree(points.slice(median + 1), depth + 1, node, dimensions);

  return node;
}

/**
 * @description Restore Parent Recursivly
 * @private
 * @param {IKDTree.IRoot} root
 * @returns {void}
 */
function restoreParent(root: IKDTree.IRoot): void {
  if (root.left) {
    root.left.parent = root;
    restoreParent(root.left);
  }

  if (root.right) {
    root.right.parent = root;
    restoreParent(root.right);
  }
}

class KDTree {
  public root: IKDTree.IKDNode;
  public dimensions: any[];
  public metric: IKDTree.TMetrix;

  constructor(points: IKDTree.TPoint, metric: number) {
    // loading pre-build tree if it's not an array
    if (!Array.isArray(points)) {
      this.dimensions = points.dimensions;
      this.root = points;
      // restore Parent method
      restoreParent(this.root);
    } else {
      // if not pre-build than build tree
      this.dimensions = new Array(points[0].length);
      for (let i = 0; i < this.dimensions.length; i++) {
        this.dimensions[i] = i;
      }
      this.root = buildTree(points, 0, null, this.dimensions);
    }
    this.metric = metric;
  }

  toJson(): KDNode {
    const result: KDNode = toJSONImpl(this.root);
    result.dimensions = this.dimensions;
    return result;
  }

  nearest(point, maxNodes, maxMetrics) {
    const mertic: IKDTree.TMetrix = this.metric;
    const dimensions: any[] = this.dimensions;
    let i;

    // todo
  }
}

// import KNNData from '../../public/knn/price-rate-example.json';
// import { distanceCalc } from './knn-simple';
// const data = KNNData.sample;

// const points = new Array(data.data.length);
// for (let i = 0; i < points.length; ++i) {
//   points[i] = data.data[i].slice();
// }
// for (let i = 0; i < data.labels.length; ++i) {
//   points[i].push(data.labels[i]);
// }
// const distance = distanceCalc([0, 1, 2, 3, 4], [5, 6, 7, 8, 9]);

// const kdTree = new KDTree(points, distance);
// console.log('kd', kdTree['root']);
