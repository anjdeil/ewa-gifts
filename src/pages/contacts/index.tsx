import { PageHeader } from "@/components/Layouts/PageHeader";
import Head from "next/head";
import styles from "./styles.module.scss";
import Socials from "@/components/Layouts/Socials/Socials";
import ContactForm from "@/components/Forms/ContactForm";

export default function Contacts() {
    return (
        <>
            <Head>
                <title>Kontakt</title>
            </Head>
            <PageHeader title="Kontakt" breadLinks={[{ name: "Kontakt", url: "" }]} />
            <main className={styles["contacts"]}>
                <div className="container">
                    <div className={styles["contacts__content"]}>

                        <div className={styles["contacts__contacts"]}>
                            <h2 className={`${styles["contacts__contacts-title"]} secondary-title`}>Dane kontaktowe</h2>
                            <div className={styles["contacts__contacts-wrapper"]}>
                                <Socials
                                    menuId={818}
                                    skeleton={
                                        {
                                            elements: 7,
                                            isColumn: true,
                                            width: "200px",
                                            height: "30px",
                                            gap: '5px'
                                        }
                                    }
                                    className={`${styles.footer__socials}`}
                                />
                            </div>
                        </div>

                        <div className={styles["contacts__map"]}>
                            <iframe
                                style={{
                                    border: "none",
                                    borderRadius: "10px"
                                }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.576009281169!2d21.004827276211294!3d52.25108445610505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd69f67b2011%3A0x7a7ca36246b27e69!2sEwa%20gifts%20sp.z.o.o!5e0!3m2!1suk!2spl!4v1723639777394!5m2!1suk!2spl"
                                width="100%"
                                height="420"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>



                    </div>
                    <div className={styles["contacts__form-wrapper"]}>
                        <h2 className={`${styles["contacts__form-title"]} secondary-title`}>SKONTAKTUJ SIĘ Z NAMI</h2>
                        <ContactForm />
                    </div>
                </div>
            </main>
        </>
    )
}