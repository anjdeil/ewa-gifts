import { wpRestApiProps } from "@/types";
import axios, { AxiosResponse } from "axios";

const authConfig: AuthConfig = {
    username: process.env.USER_NAME || '',
    password: process.env.USER_PASSWORD || ''
};

export interface AuthConfig
{
    username: string;
    password: string;
}

export class WPRestAPI
{
    private readonly _apiBase: string;
    private readonly _authConfig: AuthConfig;

    constructor(authConfig: AuthConfig)
    {
        this._apiBase = 'https://new.ewagifts.pl/wp-json/wp/v2/';
        this._authConfig = authConfig;
    }

    private getBasicAuth(): string
    {
        const { username, password } = this._authConfig;
        const encodedAuth = Buffer.from(`${username}:${password}`).toString('base64');
        return `Basic ${encodedAuth}`;
    }

    async getResource(url, params): Promise<AxiosResponse<unknown>>
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

    async get(url, params)
    {
        const result = await this.getResource(url, params);
        return result;
    }
}

const wpRestApi = new WPRestAPI(authConfig);
export default wpRestApi;