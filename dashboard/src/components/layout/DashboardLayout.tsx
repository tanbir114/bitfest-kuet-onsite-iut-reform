import DashboardIcon from '@mui/icons-material/Dashboard';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import logo from '../../assets/logo.jpeg';
import { getComponent } from '../../utils/ComponentReturn';
import { useAppSelector } from '../../redux/hook';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';

const ADMIN_NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'stories',
        title: 'Stories',
        icon: <MenuBookIcon />,
    },
    {
        segment: 'improvement',
        title: 'Contribution',
        icon: <HealthAndSafetyIcon />,
    },
    {
        segment: 'logout',
        title: 'Logout',
        icon: <LogoutIcon />,
    },
];

const USER_NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'stories',
        title: 'Stories',
        icon: <MenuBookIcon />,
    },
    {
        segment: 'logout',
        title: 'Logout',
        icon: <LogoutIcon />,
    },
];

export default function DashboardLayoutBranding() {
    const router = useDemoRouter('/dashboard');

    const user = useAppSelector((state) => state.auth.user);

    return (
        // preview-start
        <AppProvider
            navigation={
                user?.role === 'admin' ? ADMIN_NAVIGATION : USER_NAVIGATION
            }
            branding={{
                logo: <img src={logo} alt="Kotha Britto Logo" />,
                title: '',
                homeUrl: '/toolpad/core/introduction',
            }}
            router={router}
        >
            <DashboardLayout>
                {/* <DemoPageContent pathname={router.pathname} /> */}
                <div className="p-4 text-lg">
                    {getComponent(router.pathname)}
                </div>
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}
