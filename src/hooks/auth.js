import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const storageName = 'tokens';

    const login = useCallback((access, refresh) => {
        setToken(access);
        setRefreshToken(refresh);

        // if (localStorage.getItem(storageName)){ logout() }
        localStorage.setItem(storageName, JSON.stringify({ token, refreshToken }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setRefreshToken(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.refreshToken);
        }
        
    }, [login]);

    return { login, logout, token, refreshToken };
}