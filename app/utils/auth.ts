// auth.ts

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function loginUser(username: string, password: string): Promise<boolean> {
    try {
        const response = await fetch('https://foamhead-a8f24bda0c5b.herokuapp.com/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.access && data.refresh) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

export async function logoutUser(): Promise<boolean> {
    const accessToken = getAccessToken();
    console.log("Access Token for Logout:", accessToken);
    const refreshToken = getRefreshToken();

    if (!accessToken) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        return true; // Consider it successful if no token to send
    }

    try {
        const response = await fetch('https://foamhead-a8f24bda0c5b.herokuapp.com/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Ensure this line is present
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (response.status === 205) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return true;
        } else {
            console.error('Logout failed:', response.status);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return false;
        }
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        return false;
    }
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function refreshToken(): Promise<string | null> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch('https://foamhead-a8f24bda0c5b.herokuapp.com/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });
        const data = await response.json();
        if (data.access) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
            if (data.refresh) {
                localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
            }
            return data.access;
        } else {
            logoutUser(); // Refresh failed, clear tokens
            return null;
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        logoutUser();
        return null;
    }
}

