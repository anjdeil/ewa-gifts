import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useSendAnEmailMutation } from "@/store/contactForm7/contactForm7Api";
import { SubscriptionFormProps } from "@/types/Forms";
import { CustomInput } from "../CustomInput";
import variables from "@/styles/variables.module.scss";
import { WpWooError } from "@/types";

const SubscriptionFormSchema = z.object({
  email: z.string().email("Please, type valid email"),
  consent: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});

type SubscriptionFormValues = z.infer<typeof SubscriptionFormSchema>;

export const SubscriptionForm: FC<SubscriptionFormProps> = ({ formId }) => {
  const [sendAnEmail, { isError, error, data }] = useSendAnEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(SubscriptionFormSchema),
  });

  return (
    <div className={styles.form}>
      <Link href={"/"} passHref className={styles.form__logo}>
        <Image src="/logo.svg" alt="Logo" width={150} height={40} />
      </Link>
      <h3 className={`secondary-title ${styles.form__title}`}>
        Zapisz się do naszego newslettera
      </h3>
      <form
        onSubmit={handleSubmit(async ({ email }) => {
          const formData = {
            _wpcf7_unit_tag: "wpcf7-c68d4a7-o1",
            "your-email": email,
          };

          const response = await sendAnEmail({ formId, formData });

          if (response && "data" in response) {
            reset();
          }
        })}
      >
        <CustomInput
          fieldName="Adres e-mail"
          name="email"
          register={register}
          errors={errors}
        />
        <CustomInput
          fieldName="Wyrażam zgodę na przesyłanie informacji handlowej."
          name="consent"
          register={register}
          errors={errors}
          isCheckbox={true}
        />
        <button
          className="btn-primary btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {isSubmitSuccessful && !isError && (
          <p style={{ color: variables.successfully }}>
            Thank you for your message. It has been sent.
          </p>
        )}
        {isError && (
          <p
            style={{ color: variables.error }}
            dangerouslySetInnerHTML={{
              __html: (error as WpWooError).data?.message,
            }}
          />
        )}
      </form>
      <p className={`${styles.form__rules} desc`}>
        Sprawdź naszą{" "}
        <Link href={"/polityka-prywatnosci"}>Politykę Prywatności</Link> i
        dowiedz się, w jaki sposób przetwarzamy dane. W każdej chwili możesz
        przerwać subskrybcję newslettera za darmo.
      </p>
    </div>
  );
};
