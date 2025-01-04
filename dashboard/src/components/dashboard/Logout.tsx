import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

type Props = {};

function Logout({}: Props) {
    const dispatch = useDispatch();
    dispatch(logout());
    return <Navigate to={'/login'} />;
}

export default Logout;
