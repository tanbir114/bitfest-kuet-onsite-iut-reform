import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const AuthRoutes = ({ children }: Props) => {
    const token = useAppSelector((state) => state.auth.token);

    console.log('[LOG] AuthRoutes -> token', token);

    if (token) {
        toast.error('User already logges in.');
        return <Navigate to="/" />;
    }
    return children;
};

export default AuthRoutes;
