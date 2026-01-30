export interface User {
    id: string;
    createdAt: string;
    name: string;
    avatar: string;
    email: string;
    country: string;
    color: string;
    phone: string;
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt'>;
export type UserUpdateInput = Partial<UserCreateInput>;
