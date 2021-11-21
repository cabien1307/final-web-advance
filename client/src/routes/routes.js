import Home from "../pages/home/Home";
import Profile from "../pages/profile/profile";
import NotFound from "../pages/notFound/not-found";
import Notify from "../pages/notify/notify";
import Register from "../pages/register/register";
import NotifyDetail from "../pages/notify-detail/NotifyDetail";
import User from "../pages/users/User";
import Faculty from "../pages/faculty/Faculty";
import FacultyDetail from "../pages/facultyDetail/FacultyDetail";

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Home />,
        authRequired: true,
    },
    {
        path: "/faculty/:id",
        exact: false,
        main: () => <FacultyDetail />,
        authRequired: true,
    },
    {
        path: "/faculty",
        exact: false,
        main: () => <Faculty />,
        authRequired: true,
    },
    {
        path: "/profile/:id",
        exact: false,
        main: () => <Profile />,
        authRequired: true,
    },
    {
        path: "/notify/:id",
        exact: false,
        main: () => <NotifyDetail />,
        authRequired: true,
    },
    {
        path: "/notify",
        exact: false,
        main: () => <Notify />,
        authRequired: true,
    },
    {
        path: "/users",
        exact: false,
        main: () => <User />,
        authRequired: true,
    },
    {
        path: "/register",
        exact: false,
        main: () => <Register />,
        authRequired: true,
    },
    {
        path: "/*",
        exact: false,
        main: () => <NotFound />,
        authRequired: false,
    },
];

export default routes;
