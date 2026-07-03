export interface CheckoutFormValues {
  deliveryCity: string;
  deliveryPhone: string;
  deliveryEmail?: string;
  deliveryLastname: string;
  deliveryFirstname?: string;
  deliveryMiddlename?: string;
  deliveryComment?: string;
  deliveryVin?: string;
  deliveryPoint?: string;
  deliveryPointRef?: string;
  deliveryStreet?: string;
  deliveryHouse: string;
  deliveryApartment?: string;

  deliveryMethod: string;
  deliveryCityRef: string;
}

export interface WherehouseType {
  Description: string;
  DescriptionRu: string;
  Ref: string;
}

export interface NovaPoshtaCity {
  Description: string;
  DescriptionRu: string;
  Ref: string;
  Delivery1: "0" | "1";
  Delivery2: "0" | "1";
  Delivery3: "0" | "1";
  Delivery4: "0" | "1";
  Delivery5: "0" | "1";
  Delivery6: "0" | "1";
  Delivery7: "0" | "1";
  Area: string;
  SettlementType: string;
  IsBranch: "0" | "1";
  PreventEntryNewStreetsUser: "0" | "1";
  CityID: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  SpecialCashCheck: number;
  AreaDescription: string;
  AreaDescriptionRu: string;
}

export interface NovaPoshtaInfo {
  totalCount: number;
}

export interface NovaPoshtaResponse {
  success: boolean;
  data: NovaPoshtaCity[];
  errors: string[];
  warnings: string[];
  info: NovaPoshtaInfo;
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
}

export interface Warehouse {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: Dimensions;
  ReceivingLimitationsOnDimensions: Dimensions;
  Reception: WorkSchedule;
  Delivery: WorkSchedule;
  Schedule: WorkSchedule;
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  WarehouseIllusha: string;
  CategoryOfWarehouse: string;
  Direct: string;
  RegionCity: string;
  WarehouseForAgent: string;
  GeneratorEnabled: string;
  MaxDeclaredCost: string;
  WorkInMobileAwis: string;
  DenyToSelect: string;
  CanGetMoneyTransfer: string;
  HasMirror: string;
  HasFittingRoom: string;
  OnlyReceivingParcel: string;
  PostMachineType: string;
  PostalCodeUA: string;
  WarehouseIndex: string;
  BeaconCode: string;
  Location: string;
}

export interface Dimensions {
  Width: number;
  Height: number;
  Length: number;
}

export interface WorkSchedule {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export type WarehousesResponse = Warehouse[];