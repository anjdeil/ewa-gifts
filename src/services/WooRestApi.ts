export default class WooRestApi
{
    _apiBase = "https://new.ewagifts.pl/wp-json/wc/v3/";

    _authParams = {
        consumer_key: "ck_be590e9d606acd4b4be6a9f2a3fb82b1b9f56b21",
        consumer_secret: "cs_82dc58103b4c9b477b34d2aba374d1a45cea6a4c"
    };

    async getResource(url, params)
    {
        params = { ...params, ...this._authParams };

        const response = await fetch(`${this._apiBase}${url}${this._paramsToString(params)}`);
        if (!response.ok)
        {
            throw new Error(`Could not fetch ${url}, recieved ${response.status}`);
        }
        const body = await response.json();
        return body;
    };

    async getProducts(params)
    {
        const result = await this.getResource('products', params);
        return result;
    }

    _paramsToString = (params) =>
    {
        return Object.entries(params).reduce(
            (accumulator, [key, value], i, params) =>
            {
                accumulator += `${key}=${value}`;
                if (i < params.length - 1) accumulator += '&';
                return accumulator;
            }, '?');
    };

}