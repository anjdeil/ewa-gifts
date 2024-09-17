import { Skeleton } from "@mui/material";
import React from "react";

export default function WishlistSkeleton({ count }: { count: number }) {
    return new Array(count).fill(true).map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={120} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
    ));
}