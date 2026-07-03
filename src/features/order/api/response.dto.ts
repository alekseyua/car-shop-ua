export interface OrderItem {
  id: number;
  orderId: number;
  itemNo: string;
  title: string;
  quantity: number;
  price: string; // Prisma Decimal сериализуется в строку
  imageUrl: string | null;
  createdAt: string; // ISO дата
}

export interface ResponseOrder {
  id: number;
  userId: number;
  orderNumber: string;

  status: OrderStatus;

  totalPrice: string; // Decimal -> string

  deliveryCity: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryLastname: string;
  deliveryFirstname: string;
  deliveryMiddlename: string;
  deliveryComment: string;
  deliveryVin: string;
  deliveryPoint: string;
  deliveryPointRef: string;
  deliveryStreet: string;
  deliveryHouse: string;
  deliveryApartment: string;

  createdAt: string;
  updatedAt: string;

  items: OrderItem[];
}

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";