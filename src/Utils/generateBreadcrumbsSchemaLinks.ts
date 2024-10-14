import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";

interface BreadcrumbSchema
{
    "@type": string;
    "position": number;
    "item": string;
    "name": string;
}

export function generateBreadcrumbsSchemaLinks(links: BreadcrumbType[]): BreadcrumbSchema[]
{
    if (!Array.isArray(links) || links.length === 0) return [];

    return links.map(({ url, name }, i) =>
    {
        return {
            "@type": "ListItem",
            "position": i + 1,
            "item": url || '',
            "name": name || '',
        }

    })
}