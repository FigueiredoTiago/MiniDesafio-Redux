function getLocalStorage(key, initial) {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
        return initial;
    }
}

export default getLocalStorage;