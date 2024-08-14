import { BlogFetchData, BlogItemType } from "@/types";

export const transformBlogCard = (cards: BlogFetchData): BlogItemType[] => {
  return cards.map((card) => ({
    id: card.id,
    content: card.content,
    excerpt: card.excerpt,
    created: card.created,
    modified: card.modified,
    thumbnail: card.thumbnail,
    menu_order: card.menu_order,
    slug: card.slug,
    title: card.title,
    categories: card.categories,
    tags: card.tags,
    status: card.status,
    type: card.type,
    parent: card.parent,
  }));
};
