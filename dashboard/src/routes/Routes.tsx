import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { routeGenerator } from '../utils/routeGenerator';
import { AuthPath } from './auth.routes';
import DashboardLayoutBranding from '../components/layout/DashboardLayout';
import AuthRoutes from '../components/layout/AuthRoutes';
import ProtectedRoutes from '../components/layout/ProtectedRoutes';

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: (
    //         <AuthRoutes>
    //             <App />
    //         </AuthRoutes>
    //     ),
    //     children: routeGenerator(AuthPath),
    // },
    {
        path: '/',
        element: (
            <ProtectedRoutes>
                <DashboardLayoutBranding />,
            </ProtectedRoutes>
        ),
    },
    {
        path: '/',
        element: (
            <AuthRoutes>
                <App />
            </AuthRoutes>
        ),
        children: routeGenerator(AuthPath),
    },
]);

export default router;
