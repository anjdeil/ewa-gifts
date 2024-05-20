import axios, { AxiosResponse } from "axios";

export class ContactsForm7RestApi
{
    private readonly _apiBase: string;

    constructor()
    {
        this._apiBase = 'https://new.ewagifts.pl/wp-json/contact-form-7/v1/contact-forms/';
    }

    async sendAnEmail(url: string, body: any): Promise<AxiosResponse<any>>
    {
        const response: AxiosResponse<any> = await axios.post(this._apiBase + url, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        if (response.status !== 200)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }
        return response;
    }

    async send(url: string, body)
    {
        const result = await this.sendAnEmail(url, body);
        return result;
    }
}

const CF7RestApi = new ContactsForm7RestApi();
export default CF7RestApi;