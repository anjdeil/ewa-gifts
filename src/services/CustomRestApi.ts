import { paramsType, method } from "@/types/Services";
import axios, { AxiosResponse } from "axios";

class CustomRestApi
{
    private readonly _apiBase = `${process.env.REST_API_URL}/api/v2/`;

    async getResource(url: string, method: method, params?: paramsType, body?: object): Promise<AxiosResponse<unknown>>
    {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries)
        {
            try
            {
                const response: AxiosResponse<unknown> = await axios({
                    method: method,
                    url: this._apiBase + url,
                    params: params,
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
                    console.error("Error during request:", error);
                    throw new Error(`Could not fetch ${this._apiBase + url}, received ${(error as Error).message}`);
                }
            }
        }

        throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
    }

    async get(url: string, params?: paramsType): Promise<AxiosResponse<unknown>>
    {
        return this.getResource(url, 'GET', params);
    }

    async post(url: string, body: object): Promise<AxiosResponse<unknown>>
    {
        return this.getResource(url, 'POST', undefined, body);
    }
}

export const customRestApi = new CustomRestApi();
export default CustomRestApi;