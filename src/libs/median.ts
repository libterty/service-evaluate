export class Median {
  static caculate(array: number[]): number {
    return array.slice().sort((prev, next) => prev - next)[
      Math.floor(array.length / 2)
    ];
  }
}
