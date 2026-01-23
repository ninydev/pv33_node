import {MOCK_API_USERS_URL} from "../config.js";

export default async function fetchUserUpdate(userId, userData) {

    const url = `${MOCK_API_USERS_URL}/${userId}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}