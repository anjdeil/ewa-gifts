import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const wooCommerceRestApi = new WooCommerceRestApi({
    url: process.env.SITE_URL || "",
    consumerKey: process.env.WOO_CONSUMER_KEY || "",
    consumerSecret: process.env.WOO_CONSUMER_SECRET || "",
    version: process.env.WOO_REST_API_VERSION || "",
    axiosConfig: {
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }

    }
});
export default wooCommerceRestApi;
