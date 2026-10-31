import { OrderStatus } from "@/src/features/order/api/response.dto";

export const normalizeImagePath = (path: string): string =>
  path.replace(/tcd\//, "tcd-pic/").split("?")[0];

export const isYearInRange = (year: number, range: string) => {
  console.log({ year, range });
  const [from, to] = range.split(" - ");

  const fromYear = from ? Number(from.split(".")[0]) : -Infinity;

  const toYear = to ? Number(to.split(".")[0]) : Infinity;

  return year >= fromYear && year <= toYear;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getOldPrice = (price: number): number =>
  price + (price - price * 0.95);

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function getOrderStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    PENDING: "Очікує оплати",
    PAID: "Оплачено",
    PROCESSING: "Обробляється",
    SHIPPED: "Відправлено",
    DELIVERED: "Доставлено",
    CANCELLED: "Скасовано",
  };

  return labels[status] ?? status;
}
export const delaySleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getOrderStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return colors[status] ?? "bg-gray-100 text-gray-800";
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) return phone;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
}
