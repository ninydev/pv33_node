/**
 *
 */

import { UserCreateInput } from "./types";

export const MOCK_API_USERS_URL = "https://68e9272ef2707e6128cdd00e.mockapi.io/users";

export const DEFAULT_VALUES: UserCreateInput = {
    name: 'No Name',
    email: '',
    phone: '',
    country: '',
    avatar: '',
    color: '#ffffff', // Белый по умолчанию
};