import { AuthConfig } from "@/types";
import axios, { AxiosResponse } from "axios";

const authConfig: AuthConfig = {
    username: process.env.USER_NAME || '',
    password: process.env.USER_PASSWORD || ''
};

type paramsType = Record<string, string[] | string | number | undefined>;

export class WpRestApi {
    private readonly _apiBase: string;
    private readonly _authConfig: AuthConfig;

    constructor(authConfig: AuthConfig) {
        this._apiBase = `${process.env.SITE_URL}/wp-json/wp/v2/`;
        this._authConfig = authConfig;
    }

    private getBasicAuth(): string {
        const { username, password } = this._authConfig;
        const encodedAuth = Buffer.from(`${username}:${password}`).toString('base64');
        return `Basic ${encodedAuth}`;
    }

    async getResource(url: string, params?: paramsType, authorization?: string | null): Promise<AxiosResponse<unknown>> {
        const response: AxiosResponse<unknown> = await axios.get(this._apiBase + url, {
            params: params,
            headers: {
                Authorization: authorization ? authorization : this.getBasicAuth()
            }
        })

        if (response.status !== 200) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }

        return response;
    }

    async get(url: string, params?: paramsType, authorization?: string | null) {
        const result = await this.getResource(url, params, authorization);
        return result;
    }

    async put(url: string, body: object, authorization?: string | null): Promise<AxiosResponse<unknown> | undefined> {
        for (let i = 0; i < 3; i++) {
            try {
                const response = await axios.put(this._apiBase + url, body, {
                    headers: {
                        Authorization: authorization ? authorization : this.getBasicAuth()
                    }
                });

                if (response.status !== 200) {
                    throw new Error(`Could not fetch ${url}, received ${response.status}`)
                }
                return response;
            } catch (error) {
                console.log(error);
            }

        }
    }
}

const wpRestApi = new WpRestApi(authConfig);
export default wpRestApi;