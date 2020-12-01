export type TDimension = number | null;
export type TKDNodeObj = any[];
export type TMetrix = number;
export type TPoint = any;

export interface IObject {
  [key: string]: any;
}

export interface IKDNode {
  obj: TKDNodeObj;
  dimensions: number | null;
  parent: IKDNode | null;
  left: IKDNode | null;
  right: IKDNode | null;
}

export interface IRoot extends IKDNode {}
