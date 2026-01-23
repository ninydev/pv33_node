import {MOCK_API_USERS_URL} from "../config.js";


export default async function fetchUserById(userId) {
    const url = `${MOCK_API_USERS_URL}/${userId}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}