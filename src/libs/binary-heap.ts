/**
 * Original Source
 * https://eloquentjavascript.net/1st_edition/appendix2.html

 */
type TScroeFunc = (any) => number;

export default class BinarHeap {
  public content: any[] = [];
  public scoreFunc: TScroeFunc;
  constructor(scoreFunc: TScroeFunc) {
    this.scoreFunc = scoreFunc;
  }

  /**
   * @description Add element to the heap and bubble up
   * [3, 4, 5, 6, 8, 7] original
   * [3, 4, 5, 6, 8, 7, 2] 2 is being added but it should be parent root
   * [3, 4, 2, 6, 8, 7, 5] looking up at the second layer 5 is greater then 2 so swap
   * [2, 4, 3, 6, 8, 7, 5] looking up at the top layer 3 is greater then 2 so swap
   * @param {any} ele
   * @returns {void}
   */
  push(ele: any) {
    this.content.push(ele);
    this.bubbleup(this.content.length - 1);
  }

  /**
   * @description Pop element from the heap and sink down
   * [2, 3, 5, 4, 8, 7, 6] Taking out the smallest elemnt at position 1 and move the last element to the front
   * [6, 3, 5, 4, 8, 7] 6 is greater then it children 3 swap both
   * [3, 6, 5, 4, 8, 7] 6 is greater then its children 4 swap both
   * [3, 4, 5, 6, 8, 7] 6 no is smaller then both of its children, all good
   * @returns {void}
   */
  pop() {
    const result: any = this.peek();
    const end: any = this.content.pop();

    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  }

  remove(node: any) {
    const length: number = this.size();

    for (let i = 0; i < length; i++) {
      if (this.content[i] !== node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole
      // no leave hole in binary heap.
      const end: any = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i === length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleup(i);
      this.sinkDown(i);
      break;
    }
  }

  /**
   * @description Check Root
   * @returns {any}
   */
  peek(): any {
    return this.content[0];
  }

  /**
   * @description Heap Size Check
   * @returns {number}
   */
  size(): number {
    return this.content.length;
  }

  /**
   * @description Bubble up when element being added
   * @param {number} index
   * @returns {void}
   */
  bubbleup(index: number) {
    const element: any = this.content[index];

    while (index > 0) {
      // Compute the parent element's index, and fetch it.
      const parentN: number = Math.floor((index + 1) / 2) - 1;
      const parent: any = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunc(element) < this.scoreFunc(parent)) {
        this.content[parentN] = element;
        this.content[index] = parent;
        // Update 'n' to continue at the new position.
        index = parentN;
      } else {
        // Found a parent that is less, no need to move it further.
        break;
      }
    }
  }

  /**
   * @description Sink down when element being removed
   * @param {number} index
   * @returns {void}
   */
  sinkDown(index: number) {
    const length: number = this.content.length;
    const element: any = this.content[index];
    const elemScore: number = this.scoreFunc(element);

    for (;;) {
      // Compute the indices of the child elements.
      const child2N: number = (index + 1) * 2;
      const child1N: number = child2N - 1;

      let swap = null;
      // assume left compare
      const child1: any = this.content[child1N];
      const child1Score: number = this.scoreFunc(child1);
      if (child1N < length) {
        if (child1Score < elemScore) swap = child1N;
      }
      // assume right comapre
      const child2: any = this.content[child2N];
      const child2Score: number = this.scoreFunc(child2);
      if (child2N < length) {
        if (child2Score < (swap === null ? elemScore : child1Score))
          swap = child2N;
      }
      // if order is not yet finish
      if (swap !== null) {
        this.content[index] = this.content[swap];
        this.content[swap] = element;
        index = swap;
      } else {
        // order is finished
        break;
      }
    }
  }
}
