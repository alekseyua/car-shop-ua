'use client';

import DOMPurify from 'isomorphic-dompurify';

interface ProductDescriptionProps {
    description?: string | null;
}

export const ProductDescription = ({
    description,
}: ProductDescriptionProps) => {
    if (!description) return null;

    const cleanHtml = DOMPurify.sanitize(description);

    return (
        <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
};