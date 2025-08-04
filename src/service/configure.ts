export function getDecodedToken() {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    const payload = token.split('.')[1];
    const jsonPayload = atob(payload);
    return JSON.parse(jsonPayload);
}