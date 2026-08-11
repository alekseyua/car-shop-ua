// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//     // Match all pathnames except for
//     // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//     // - … the ones containing a dot (e.g. `favicon.ico`)
//     matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// };


import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
    locales: ['en', 'ru', 'uk'],
    defaultLocale: 'uk',
});

export default function proxy(request: NextRequest) {
    return handleI18nRouting(request);
}

export const config = {
    matcher: [
        '/',
        '/(en|ru|uk)/:path*',
    ],
};