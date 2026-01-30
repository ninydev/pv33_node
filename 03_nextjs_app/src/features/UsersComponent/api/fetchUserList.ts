import {MOCK_API_USERS_URL} from "../config";
import { User } from "../types";

export default async function fetchUserList(page: number = 1, limit: number = 10): Promise<User[]> {

    const url = new URL(MOCK_API_USERS_URL);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}