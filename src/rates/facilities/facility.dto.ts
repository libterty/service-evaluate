export interface IFurniture {
  refrigerator?: boolean;
  conditioner?: boolean;
  gas?: boolean;
  bed?: boolean;
  desk?: boolean;
  chair?: boolean;
  sofa?: boolean;
  laundry?: boolean;
  heater?: boolean;
  cable?: boolean;
  internet?: boolean;
  wardrobe?: boolean;
  tv?: boolean;
}

export interface IPrice {
  deposit: number;
  monthlyPrice: number;
  managementFee: number;
  parkingFee: number;
}

export interface ITransport {
  bus?: boolean;
  hsr?: boolean;
  publicBike?: boolean;
  subway?: boolean;
  train?: boolean;
}
