export const loadLocalStorageState = (localStorageName: string) =>
{
    try
    {
        const serializedState = localStorage.getItem(localStorageName);
        if (serializedState === null)
        {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error)
    {
        console.error('Error loading state from localStorage:', error);
        return undefined;
    }
};