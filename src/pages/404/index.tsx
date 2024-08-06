import Head from "next/head";
import styles from "./styles.module.scss";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <>
            <Head>
                <title>Not found</title>
            </Head>
            <main>
                <div className="container">
                    <div className={styles["not-found"]}>
                        <div className={styles["not-found__content"]}>
                            <p className={styles["not-found__text"]}>Strona nie znaleziona</p>
                            <Link href={"/"} className={styles["not-found__button"]}>Powrót</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default NotFoundPage;
