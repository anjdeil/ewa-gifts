import axios, { AxiosResponse } from "axios";
import { IncomingHttpHeaders } from "http";

class wooCustomRestAPI
{
    private readonly _apiBase = `${process.env.SITE_URL}/wp-json/wc/v3/`;

    async get(url: string, headers: IncomingHttpHeaders, method: string): Promise<AxiosResponse<unknown>>
    {
        console.log('sss!', method)
        const response: AxiosResponse = await axios({
            url: this._apiBase + url,
            headers: headers,
            method: method
        });

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }

        return response;
    }
}

export const wooCustomRestApi = new wooCustomRestAPI();

export default wooCustomRestApi;