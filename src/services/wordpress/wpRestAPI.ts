import { AuthConfig } from "@/types";
import axios, { AxiosResponse } from "axios";
import { paramsType, method } from "@/types/Services";

const authConfig: AuthConfig = {
    username: process.env.USER_NAME || '',
    password: process.env.USER_PASSWORD || ''
};

export class WpRestApi
{
    private readonly _apiBase: string;
    private readonly _authConfig: AuthConfig;

    constructor(authConfig: AuthConfig)
    {
        this._apiBase = `${process.env.SITE_URL}/wp-json/wp/v2/`;
        this._authConfig = authConfig;
    }

    private getBasicAuth(): string
    {
        const { username, password } = this._authConfig;
        const encodedAuth = Buffer.from(`${username}:${password}`).toString('base64');
        return `Basic ${encodedAuth}`;
    }

    async getResource(url: string, method: method, params?: paramsType, authorization?: string | null, body?: object): Promise<AxiosResponse<unknown>>
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
                    headers: {
                        Authorization: authorization ? authorization : this.getBasicAuth(),
                    },
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

    async get(url: string, params?: paramsType, authorization?: string | null)
    {
        const result = await this.getResource(url, 'GET', params, authorization);
        return result;
    }

    async put(url: string, body: object, authorization?: string | null,)
    {
        const result = await this.getResource(url, 'PUT', {}, authorization, body);
        return result;
    }
}

const wpRestApi = new WpRestApi(authConfig);
export default wpRestApi;