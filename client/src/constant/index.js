export const menus = [
    {
        name: "Home",
        to: "/",
        exact: true,
        icon: "fas fa-home",
        role: [3],
    },
    {
        name: "Faculty",
        to: "/faculty",
        exact: false,
        icon: "far fa-list-alt",
        role: [3],
    },
    {
        name: "Add user",
        to: "/register",
        exact: false,
        icon: "fas fa-plus",
        role: [0],
    },

    {
        name: "Users",
        to: "/users",
        exact: false,
        icon: "fas fa-users",
        role: [0],
    },
    {
        name: "Notification",
        to: "/notify",
        exact: false,
        icon: "far fa-bell",
        role: [3],
    },
    {
        name: "Profile",
        to: "/profile/:id",
        exact: false,
        icon: "far fa-user",
        role: [1, 2],
    },
    {
        name: "More",
        to: "/more",
        exact: false,
        icon: "fas fa-ellipsis-h",
        role: [3],
    },
];

// 0 admin
// 1 teacher
// 2 student
// 3 all