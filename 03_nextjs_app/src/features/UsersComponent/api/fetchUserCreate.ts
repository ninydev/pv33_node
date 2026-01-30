import {MOCK_API_USERS_URL} from "../config";
import { User, UserCreateInput } from "../types";

export const fetchUserCreate = async (userData: UserCreateInput): Promise<User> => {

    const url = new URL(MOCK_API_USERS_URL);

    const response = await fetch(url, {
        method: 'POST',
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