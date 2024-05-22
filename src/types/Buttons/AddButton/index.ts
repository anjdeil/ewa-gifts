import { z } from "zod";

const AddButtonPropsState = z.object({
    onClickHandler: z.function().returns(z.void()),
    className: z.string(),
    disabled: z.boolean()
});

export type AddButtonProps = z.infer<typeof AddButtonPropsState>;