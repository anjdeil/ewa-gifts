import { z } from "zod";

export const transformDeleteOrderProductsSchema = z.array(z.number());
export type transformDeleteOrderProductsType = z.infer<typeof transformDeleteOrderProductsSchema>;