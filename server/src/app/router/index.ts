import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StoryRoute } from '../modules/story/story.route';
import { ChatRoute } from '../modules/chat/chat.route';
import { ImprovementRoute } from '../modules/improvement/improvement.route';
import { SearchRoute } from '../modules/search/search.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoute,
    },
    {
        path: '/story',
        route: StoryRoute,
    },
    {
        path: '/chat',
        route: ChatRoute,
    },
    {
        path: '/improvement',
        route: ImprovementRoute,
    },
    {
        path: '/search',
        route: SearchRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
