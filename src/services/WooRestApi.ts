export default class WooRestApi {
    _apiBase = "https://ewagifts.pl/wp-json/wc/v3/";

    _authParams = {
        consumer_key: "ck_04bc58455e69c86a01c0f0a779fa86799616d470",
        consumer_secret: "cs_0e77756335aa54e8781080573179ec4045da7582"
    };

    async getResource(url, params) {
        params = { ...params, ...this._authParams };

        const response = await fetch(`${this._apiBase}${url}${this._paramsToString(params)}`);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, recieved ${response.status}`);
        }
        const body = await response.json();
        return body;
    };

    _paramsToString = (params) => {
        return Object.entries(params).reduce(
            (accumulator, [key, value], i, params) => {
                accumulator += `${key}=${value}`;
                if (i < params.length - 1) accumulator += '&';
                return accumulator;
            }, '?');
    };

}