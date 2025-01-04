import Logout from '../components/dashboard/Logout';
import Analytics from '../pages/analytics/Analytics';
import Improvement from '../pages/improvement/Improvement';
import Stories from '../pages/stories/Stories';

export const getComponent = (pathName: string) => {
    switch (pathName) {
        case '/dashboard':
            return <Analytics />;
        case '/improvement':
            return <Improvement />;
        case '/stories':
            return <Stories />;
        case '/logout':
            return <Logout />;
        default:
            return 'Not Found';
    }
};
