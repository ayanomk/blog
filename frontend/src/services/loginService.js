export const validateLogin = async (loginInfo) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
    });
    
    const data = await res.json();

    return data;
}
