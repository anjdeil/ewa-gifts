import { z } from "zod";

export const GoogleReviewsBuildSchema = z.object({
    google_reviews: z.string(),
    _type: z.string(),
})

export const GoogleReviewSchema = z.object({
    author_name: z.string(),
    author_url: z.string(),
    language: z.string(),
    original_language: z.string(),
    profile_photo_url: z.string(),
    rating: z.number(),
    relative_time_description: z.string(),
    text: z.string(),
    time: z.number(),
    translated: z.boolean()
});

export type ReviewType = {
    photo: string,
    name: string,
    rating: number,
    text: string,
    authorUrl: string,
    open: string,
    setOpen: (name: string) => void,
};

export type GoogleReviewType = z.infer<typeof GoogleReviewSchema>;
