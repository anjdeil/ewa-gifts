import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const wooCommerceRestApi = new WooCommerceRestApi({
    url: "https://new.ewagifts.pl",
    consumerKey: "ck_be590e9d606acd4b4be6a9f2a3fb82b1b9f56b21",
    consumerSecret: "cs_82dc58103b4c9b477b34d2aba374d1a45cea6a4c",
    version: "wc/v3",
    axiosConfig: {
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }

    }
});
export default wooCommerceRestApi;
