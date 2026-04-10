import { API_BASE } from './apiConfig.js';

export const validateLogin = async (loginInfo) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
    });
    
    const data = await res.json();

    return data;
}
