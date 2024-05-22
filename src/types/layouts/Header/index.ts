import { z } from "zod";

export const LinkSchema = z.object({
  url: z.string(),
  title: z.string()
});

export const NavProps = z.array(LinkSchema);

export interface NavPropsType
{
  links: z.infer<typeof NavProps>;
}
