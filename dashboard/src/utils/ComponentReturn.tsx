import Analytics from '../pages/analytics/Analytics';
import Improvement from '../pages/improvement/Improvement';

export const getComponent = (pathName: string) => {
    switch (pathName) {
        case '/dashboard':
            return <Analytics />;
        case '/improvement':
            return <Improvement />;
        case '/improvement':
            return 'Improvement';
        default:
            return 'Not Found';
    }
};
