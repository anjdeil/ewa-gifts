export type CookieRowsType = {
    [key: string]: string
};

const parseCookies = (cookiesString: string): CookieRowsType => {
    const stringRows = cookiesString.split('; ');

    const cookieRows: CookieRowsType = {};
    stringRows.forEach(stringRow => {
        const equalIndex = stringRow.indexOf('=');
        if (equalIndex === -1) return;

        const key = stringRow.substring(0, equalIndex);
        const value = stringRow.substring(equalIndex + 1);
        cookieRows[key] = value;
    });

    return cookieRows;
}

export default parseCookies;