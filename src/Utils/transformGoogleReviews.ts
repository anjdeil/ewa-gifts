import { GoogleReviewType } from "@/types/GoogleReviews";

export default function transformGoogleReviews(googleReviews: GoogleReviewType[]) {
    return googleReviews.map(({
        author_name: name,
        author_url: authorUrl,
        profile_photo_url: photo,
        rating,
        text
    }) => ({
        name,
        authorUrl,
        photo,
        rating,
        text
    }))
}