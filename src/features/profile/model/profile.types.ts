import { OrderItem } from "../../order/api/response.dto";

export interface ResponseMyOrder {
    id: number;
    userId: number;
    orderNumber: string;

    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

    totalPrice: string;

    deliveryPhone: string;
    deliveryEmail: string;
    deliveryLastname: string;
    deliveryFirstname: string;
    deliveryMiddlename: string;

    deliveryCity: string;
    deliveryPoint: string;
    deliveryPointRef: string;
    deliveryStreet: string;
    deliveryHouse: string;
    deliveryApartment: string;
    deliveryComment: string;
    deliveryVin: string;

    items: OrderItem[];

    createdAt: string;
    updatedAt: string;
}