import { z } from "zod";

export const cookieSchema = z.object({
    SL_GWPT_Show_Hide_tmp: z.string(),
    SL_G_WPT_TO: z.string(),
    SL_wptGlobTipTmp: z.string(),
    myCookie: z.string(),
    userToken: z.string().optional()
});