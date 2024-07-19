export const loadLocalStorageState = (localStorageName: string) => {
    if (typeof window !== 'undefined') {
        const stateJSON = localStorage.getItem(localStorageName);

        if (!stateJSON) return undefined;

        const state = JSON.parse(stateJSON);
        return state;
    }

    return undefined;
};