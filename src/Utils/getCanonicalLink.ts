export function getCanonicalLink(path: string, domain: string, blog: boolean = false): string
{
    if (blog)
    {
        const regex = /\?page=\d+/;
        if (regex.test(path))
            return `${domain}${path.replace(/\?/, '/').replace(/=/, '/')}`;
    }

    if (path.includes('?')) return `${domain}${path.split('?')[0]}`;
    return `${domain}${path}`;
}