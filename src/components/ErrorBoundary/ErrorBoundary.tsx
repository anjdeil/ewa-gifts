import React, { Component, ErrorInfo } from 'react';
import ErrorBanner from '@/components/Layouts/ErrorBanner';

interface Props
{
    children: React.ReactNode;
}

interface State
{
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError()
    {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo)
    {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
    }

    removeError = () =>
    {
        this.setState({ hasError: false });
    }

    render()
    {
        if (this.state.hasError)
        {
            return <ErrorBanner />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;