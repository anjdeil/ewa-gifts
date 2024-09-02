import { validateApiError } from "@/Utils/validateApiError";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {

    axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
        params: {
            key: process.env.GOOGLE_PLACES_API_KEY,
            place_id: process.env.GOOGLE_PLACE_ID,
            language: "pl"
        }
    })
        .then((response) => res.status(200).json(response?.data?.result))
        .catch((error) => {
            validateApiError(error, res);
        });

}