import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StoryRoute } from '../modules/story/story.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
