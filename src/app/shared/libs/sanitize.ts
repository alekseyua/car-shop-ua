import DOMPurify from "dompurify";

export function sanitize(html: string) {
    if (typeof window === "undefined") {
        const { JSDOM } = require("jsdom");
        const window = new JSDOM("").window;
        const purify = DOMPurify(window);
        return purify.sanitize(html);
    }

    return DOMPurify.sanitize(html);
}