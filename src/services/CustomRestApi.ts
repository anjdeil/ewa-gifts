import axios, { AxiosResponse } from "axios";

class CustomRestApi {
    private readonly _apiBase = `${process.env.REST_API_URL}/api/v2/`;

    async get(url: string, params?: Record<string, string[] | string | number | undefined>): Promise<AxiosResponse<unknown> | undefined> {
        for (let i = 0; i < 3; i++) {
            try {
                const response = await axios.get(this._apiBase + url, {
                    params: params
                });

                if (response.status !== 200) {
                    throw new Error(`Could not fetch ${url}, received ${response.status}`);
                }

                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export const customRestApi = new CustomRestApi();

export default CustomRestApi;