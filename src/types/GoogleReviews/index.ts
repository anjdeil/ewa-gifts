import { z } from "zod"

export const GoogleReviewsBuildSchema = z.object({
    google_reviews: z.string(),
    _type: z.string(),
})