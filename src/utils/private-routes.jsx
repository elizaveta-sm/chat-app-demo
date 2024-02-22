import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const { currentUser } = useSelector((state) => state.auth);

    return (currentUser) ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes