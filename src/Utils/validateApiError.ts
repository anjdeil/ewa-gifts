// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateApiError(error: any, res: any): void 
{
    if (error.response)
    {
        res.status(error.response.status).json({
            message: error.response.data.message || "API Error",
            details: error.response.data
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