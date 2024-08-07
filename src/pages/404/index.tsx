import ErrorBanner from "@/components/Layouts/ErrorBanner";

const NotFoundPage = () => {
    return (
        <ErrorBanner statusCode={404} />
    );
}

export default NotFoundPage;
