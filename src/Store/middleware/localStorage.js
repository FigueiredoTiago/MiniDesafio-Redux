/* eslint-disable no-unused-vars */
const localStorage = (storage) => (next) => (action) => {
    const response = next(action);
    const { meta } = action;
    if (meta && meta.localStorage !== undefined) {
        const { key, value } = meta.localStorage;
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    return response;
};

export default localStorage; 