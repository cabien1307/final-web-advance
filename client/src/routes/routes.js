import Home from "../pages/home/Home";
import Profile from "../pages/profile/profile";
import NotFound from "../pages/notFound/not-found"
import Notify from "../pages/notify/notify";
import Register from "../pages/register/register";

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />,
        authRequired: true,
    },
    {
        path: '/profile/:id',
        exact: false,
        main: () => <Profile />,
        authRequired: true,
    },
    {
        path: '/notify',
        exact: false,
        main: () => <Notify />,
        authRequired: true,
    },
    {
        path: '/register',
        exact: false,
        main: () => <Register />,
        authRequired: true,
    },
    {
        path: '/*',
        exact: false,
        main: () => <NotFound />,
        authRequired: false,

    }
]

export default routes;