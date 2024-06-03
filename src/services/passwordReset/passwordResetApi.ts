import axios, { AxiosResponse } from "axios";
class passwordResetApi
{
    private readonly _apiBase: string;

    constructor()
    {
        this._apiBase = `${process.env.SITE_URL}/wp-json/bdpwr/v1/`;
    }

    async getResource(url: string | string[], body?: unknown): Promise<AxiosResponse<unknown>>
    {
        const response = await axios({
            url: `${this._apiBase}${url}`,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }

        return response;
    }

    async post(url: string | string[], body?: unknown)
    {
        return this.getResource(url, body);
    }
}

const passwordReset = new passwordResetApi();
export default passwordReset;