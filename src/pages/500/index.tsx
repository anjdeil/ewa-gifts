import ErrorBanner from "@/components/Layouts/ErrorBanner";

const ErrorPage = () => {
    return (
        <ErrorBanner statusCode={500} />
    );
}

export default ErrorPage;
