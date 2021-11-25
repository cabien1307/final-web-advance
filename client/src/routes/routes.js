import Home from "../pages/home/Home";
import Profile from "../pages/profile/profile";
import Notify from "../pages/notify/notify";
import Register from "../pages/register/register";
import NotifyDetail from "../pages/notify-detail/NotifyDetail";
import User from "../pages/users/User";
import Faculty from "../pages/faculty/Faculty";
import FacultyDetail from "../pages/facultyDetail/FacultyDetail";
import { isId } from "../utils/validation"
import NotFound from "../pages/notFound/not-found";

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Home />,
        authRequired: true,
    },
    {
        path: "/faculty/:id",
        exact: true,
        main: () => <FacultyDetail />,
        authRequired: true,
    },
    {
        path: "/faculty",
        exact: true,
        main: () => <Faculty />,
        authRequired: true,
    },
    {
        path: "/profile/:id",
        exact: true,
        main: () => <Profile />,
        authRequired: true,
    },
    {
        path: "/notify/:id/detail",
        exact: true,
        main: ({ match }) => {
            return isId(match.params.id) ? <NotifyDetail match={match} /> : <NotFound />
        },
        authRequired: true,
    },
    {
        path: "/notify",
        exact: true,
        main: () => <Notify />,
        authRequired: true,
    },
    {
        path: "/users",
        exact: true,
        main: () => <User />,
        authRequired: true,
    },
    {
        path: "/register",
        exact: true,
        main: () => <Register />,
        authRequired: true,
    },
];

export default routes;
