import {MOCK_API_USERS_URL} from "../config.js";

export const fetchUserDelete = async (userId) => {
    const url = `${MOCK_API_USERS_URL}/${userId}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return true;
}