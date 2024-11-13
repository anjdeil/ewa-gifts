import { responseSingleCategoryCustomApiSchema } from "@/types/Services/customApi/Category/CategoryType";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateResponseSingleCategory(res: any): Promise<boolean>
{
    try
    {
        responseSingleCategoryCustomApiSchema.parse(res);
        return true;
    } catch (error)
    {
        if (error instanceof ZodError)
        {
            console.error("Validation failed in single category response:", error.errors);
            return false;
        }
        console.error("Unexpected error:", error);
        return false;
    }
}