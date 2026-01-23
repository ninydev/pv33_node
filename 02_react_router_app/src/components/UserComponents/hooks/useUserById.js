import {useEffect, useState} from "react";
import fetchUserById from "../api/fetchUserById.js";

export const useUserById = (userId) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            loadUserById(userId);
        }
    }, [userId]);

    const loadUserById = async (id) => {
        setIsLoading(true);
        try {
            const data = await fetchUserById(id);
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { user, isLoading, error, refresh: () => loadUserById(userId) };
};