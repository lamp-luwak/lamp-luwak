
export function auth() {
    return async ({ updateStore }) => {
        const token = await fetch('/auth/get-token');
        console.log(token);
    }
}