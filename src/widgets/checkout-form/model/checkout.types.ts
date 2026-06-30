export interface CheckoutFormValues {
  phone: string;
  email: string;
  lastname: string;
  firstname: string;
  middlename: string;
  city: string;
  comment: string;
  vin: string;
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