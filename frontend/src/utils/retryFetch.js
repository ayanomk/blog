export const retry = async (fn, retries, delay) => {
    try {
        return await fn();
    } catch (err) {
        const networkError = err.status === undefined;
        const serverError = err.status >- 500;
        if (retries > 0 && (networkError || serverError)) {
            await new Promise(r => setTimeout(r, delay));
            return retry(fn, retries - 1, delay);
        };
        throw err;
    }
}