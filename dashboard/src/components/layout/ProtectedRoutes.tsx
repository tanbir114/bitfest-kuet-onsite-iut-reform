import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
    const token = useAppSelector((state) => state.auth.token);

    if (!token) {
        toast.error('User not logged in.');
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoutes;
