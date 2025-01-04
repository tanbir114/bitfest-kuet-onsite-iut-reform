export type TUser = {
    _id: string;
    id?: string;
    role: 'user' | 'admin';
    name: string;
    email: string;
    password: string;
};
