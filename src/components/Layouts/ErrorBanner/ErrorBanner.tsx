import Head from "next/head";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

const ErrorBanner = ({ statusCode = 500 }: { statusCode?: number }) => {
    const router = useRouter();

    const errorInfo = {
        title: "",
        text: "",
        imageUrl: ""
    };

    switch (statusCode) {
        case 404:
            errorInfo.title = "Strona nie znaleziona";
            errorInfo.text = "Strona nie znaleziona";
            errorInfo.imageUrl = "/images/404.jpg"
            break;
        case 500:
            errorInfo.title = "Zaszła pomyłka";
            errorInfo.text = "Tak, tak, tak... Zaszła pomyłka!";
            errorInfo.imageUrl = "/images/500.jpg"
            break;
    }

    const { title, text, imageUrl } = errorInfo;
    return (
        <>
            <Head>
                <title>{title} - Ewa Gifts</title>
            </Head>
            <main>
                <div className="container">
                    <div className={styles["not-found"]} style={{ backgroundImage: `url(${imageUrl})` }}>
                        <div className={styles["not-found__content"]}>
                            <p className={styles["not-found__text"]}>{text}</p>
                            {statusCode === 404 ?
                                <Link href={"/"} className={styles["not-found__button"]}>Powrót</Link> :
                                <button onClick={() => router.reload()} className={styles["not-found__button"]}>Powtórz</button>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ErrorBanner;
