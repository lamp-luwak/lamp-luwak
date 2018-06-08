
export function auth() {
    return async ({ updateStore }) => {
        const token = await fetch('/auth/token/create');
        console.log(token);
    }
}
