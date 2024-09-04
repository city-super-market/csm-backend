import express from 'express';
import adminRoutes from './admin.routes';
import HomeRoutes from './home.routes';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: HomeRoutes,
    },
    {
        path: '/admins',
        route: adminRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
