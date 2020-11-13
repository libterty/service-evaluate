export class Stack {
  public items = [];

  public push(element: any): void {
    this.items.push(element);
  }

  public pop(): any {
    return this.items.pop();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public peek(): any {
    return this.items[this.items.length - 1];
  }

  public size(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }

  public toString(): string {
    return this.items.toString();
  }
}
