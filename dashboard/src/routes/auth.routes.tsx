import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

export const AuthPath = [
    {
        name: 'Login',
        path: '/login',
        element: <Login />,
    },
    {
        name: 'Signup',
        path: '/signup',
        element: <Signup />,
    },
];
