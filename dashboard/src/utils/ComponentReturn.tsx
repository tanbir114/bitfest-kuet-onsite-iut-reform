import Improvement from '../pages/improvement/Improvement';

export const getComponent = (pathName: string) => {
    switch (pathName) {
        case '/improvement':
            return <Improvement />;
        case '/improvement':
            return 'Improvement';
        default:
            return 'Not Found';
    }
};
