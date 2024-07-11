export type CookieRowsType = {
    [key: string]: string
};

const parseCookies = (cookiesString: string): CookieRowsType => {
    const stringRows = cookiesString.split(';');

    const cookieRows: CookieRowsType = {};
    stringRows.forEach(stringRow => {
        const [key, value] = stringRow.split('=');
        cookieRows[key] = value;
    })

    return cookieRows;
}

export default parseCookies;