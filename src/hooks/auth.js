import { useState, useCallback } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const login = useCallback((access, refresh) => {
        setToken(access);
        setRefreshToken(refresh);
    }, []);

    return { login };
}