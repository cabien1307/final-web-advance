export const menus = [
    {
        name: "Home",
        to: "/",
        exact: true,
        icon: "fas fa-home",
    },
    {
        name: "Faculty",
        to: "/faculty",
        exact: false,
        icon: "far fa-list-alt",
    },
    {
        name: "Notification",
        to: "/notify",
        exact: false,
        icon: "far fa-bell",
    },
    {
        name: "Add user",
        to: "/register",
        exact: false,
        icon: "fas fa-plus",
    },
    {
        name: "Profile",
        to: "/profile/:id",
        exact: false,
        icon: "far fa-user",
    },
    {
        name: "More",
        to: "/more",
        exact: false,
        icon: "fas fa-ellipsis-h",
    },
];
