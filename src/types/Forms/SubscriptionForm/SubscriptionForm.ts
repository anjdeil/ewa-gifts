import { z } from "zod";

const SubscriptionFormPropsSchema = z.object({
    formId: z.number()
});

export type SubscriptionFormProps = z.infer<typeof SubscriptionFormPropsSchema>;