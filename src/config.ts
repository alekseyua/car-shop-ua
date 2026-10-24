export const locales = ['uk', 'en', 'ru'] as const;
// export const BACKEND_HOST = "http://169.254.253.19:3000" as const;
const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

if (!backendHost) {
  throw new Error("BACKEND_HOST is not defined");
}

export const BACKEND_HOST = backendHost;
export const API_KEY_NOVAPOSHTA = '4c4ef8b89a1d290784ae940bdb6ab710';

export const PHONE_SERVICE_1 = '0956165129';
export const PHONE_SERVICE_2 = '0636108384';
export const PHONE_SERVICE_3 = '0956165129';
export const EMAIL_SERVICE = 'alekseyuadnepr@gmail.com';
export const CITY_OFFICE = 'Кривий Ріг';