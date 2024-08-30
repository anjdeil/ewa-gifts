import axios, { AxiosResponse, AxiosRequestHeaders } from "axios";

type paramsType = Record<string, string[] | string | number | undefined>;

class CustomRestApi
{
    private readonly _apiBase = `${process.env.REST_API_URL}/api/v2/`;

    async getResource(url: string, params?: paramsType, body?: object, headers?: AxiosRequestHeaders, method: string): Promise<AxiosResponse<unknown>>
    {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries)
        {
            try
            {
                const response: AxiosResponse<unknown> = await axios({
                    method: 'GET',
                    url: this._apiBase + url,
                    params: params,
                    headers,
                    data: body
                });

                if (response.status >= 200 && response.status < 300)
                {
                    return response;
                } else if (response.status === 400)
                {
                    throw new Error(`Bad request: ${response.statusText}`);
                } else
                {
                    attempt++;
                }
            } catch (error)
            {
                attempt++;
                if (attempt >= maxRetries)
                {
                    throw new Error(`Could not fetch ${url}, received ${error}`);
                }
            }
        }

        throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
    }

    async get(url: string, params?: paramsType, headers?: AxiosRequestHeaders): Promise<AxiosResponse | undefined>
    {
        const result = await this.getResource(url, params, {}, headers);
        return result;
    }

    async post(url: string, body: object, headers?: AxiosRequestHeaders): Promise<AxiosResponse<unknown> | undefined>
    {
        const result = await this.getResource(url, undefined, body, headers);
        return result;
    }
}

export const customRestApi = new CustomRestApi();

export default CustomRestApi;