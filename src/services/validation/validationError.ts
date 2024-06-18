import { AxiosError } from 'axios';

interface CustomResponse
{
    status: (code: number) => CustomResponse;
    json: (body: any) => CustomResponse;
}

interface ErrorResponseData
{
    message?: string;
    [key: string]: any;
}

export function handleError(error: AxiosError, res: CustomResponse)
{
    if (error.response)
    {
        const data = error.response.data as ErrorResponseData;
        console.error('API error:', data);
        res.status(error.response.status).json({
            message: data.message || 'API Error',
            details: data
        });
    } else if (error.request)
    {
        console.error('Network error:', error.request);
        res.status(503).json({ message: 'No response from server', details: error.request });
    } else
    {
        console.error('Unexpected error:', error.message);
        res.status(500).json({ message: 'Unexpected error', details: error.message });
    }
}
