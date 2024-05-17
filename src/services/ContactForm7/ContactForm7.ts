import axios, { AxiosResponse } from "axios";

export class ContactsForm7API
{
    private readonly _apiBase: string;

    constructor()
    {
        this._apiBase = 'https://new.ewagifts.pl/wp-json/contact-form-7/v1/contact-forms/';
    }

    async getResource(url: string, params?: any): Promise<AxiosResponse<any>>
    {
        const response: AxiosResponse<any> = await axios.get(this._apiBase + url, {
            params: params,
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }

        return response;
    }

    async get(url: string, params: any)
    {
        const result = await this.getResource(url, params);
        return result;
    }
}

const CF7Api = new ContactsForm7API();
export default CF7Api;