import DashboardIcon from '@mui/icons-material/Dashboard';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import logo from '../../assets/logo.jpeg';
import { getComponent } from '../../utils/ComponentReturn';

const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'improvement',
        title: 'Contribution',
        icon: <HealthAndSafetyIcon />,
    },
];

export default function DashboardLayoutBranding() {
    const router = useDemoRouter('/dashboard');

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
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
