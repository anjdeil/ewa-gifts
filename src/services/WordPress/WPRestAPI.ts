import { AuthConfig } from "@/types";
import axios, { AxiosResponse } from "axios";

const authConfig: AuthConfig = {
    username: process.env.USER_NAME || '',
    password: process.env.USER_PASSWORD || ''
};
export class WPRestAPI
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

    async getResource(url: string, params?: Record<string, string[] | string | number | undefined>): Promise<AxiosResponse<unknown>>
    {
        const response: AxiosResponse<unknown> = await axios.get(this._apiBase + url, {
            params: params,
            headers: {
                Authorization: this.getBasicAuth()
            }
        })

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }

        return response;
    }

    async get(url: string, params?: Record<string, string[] | string | number | undefined>)
    {
        const result = await this.getResource(url, params);
        return result;
    }
}

const wpRestApi = new WPRestAPI(authConfig);
export default wpRestApi;