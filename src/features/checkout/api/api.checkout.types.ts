export type CreatePaymentResponse = {
  paymentId: number;
};

export type LiqPayCheckout = {
  action: string;
  data: string;
  signature: string;
};
