import { FC } from "react"; import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";

// const SubscriptionFormSchema = z.object({
//     email:
// })

// export const SubscriptionForm: FC = () =>
// {

// }