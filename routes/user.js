const router = require("express-promise-router")();
const passport = require("passport");
const auth = require("../middleware/auth");
require("../middleware/passport");

// Import validator
const {
    validateParams,
    validateBody,
    schemas,
} = require("../middleware/validateRouter");

// Import controller
const userController = require("../controller/user");

router.get("/", userController.getAll);

router.get("/role", userController.getUserByRole);

// getByID
router.get(
    "/:id/getByID",
    validateParams(schemas.idSchema, "id"),
    userController.getUserByID
);

// Edit user
router.put(
    "/:id/replace",
    validateParams(schemas.idSchema, "id"),
    validateBody(schemas.userReplaceSchema),
    userController.replaceUser
);

router.patch(
    "/:id/update",
    validateParams(schemas.idSchema, "id"),
    validateBody(schemas.userUpdateSchema),
    userController.updateUser
);

router.patch(
    "/:userID/update-role",
    validateParams(schemas.idSchema, "userID"),
    userController.updateRole
);

//  Delete user
router.delete(
    "/:userID/delete",
    validateParams(schemas.idSchema, "userID"),
    auth,
    userController.deleteUser
);

// secret : get user-info
router.post(
    "/secret",
    passport.authenticate("jwt", { session: false }),
    userController.secret
);

// signup
router.post(
    "/sign-up",
    validateBody(schemas.userSchema),
    userController.signUp
);

//  get-access-token
router.post("/get-access-token", userController.getAccessToken);

router.post(
    "/auth/google",
    passport.authenticate("google-token", { session: false }),
    userController.authGoogle
);

router.post(
    "/auth/facebook",
    passport.authenticate("facebook-token", { session: false }),
    userController.authFacebook
);

// login
router.post(
    "/sign-in",
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    userController.signIn
);

// Logout
router.post("/log-out", userController.logOut);

// roleTeacher
router.get(
    "/:teacherID/get-role-teacher",
    validateParams(schemas.idSchema, "teacherID"),
    userController.getRoleTeacher
);

// Update role
router.patch(
    "/:teacherID/set-role-teacher",
    validateParams(schemas.idSchema, "teacherID"),
    validateBody(schemas.userListRolePost),
    userController.setRoleTeacher
);

// Change password
router.patch(
    "/change-password",
    passport.authenticate("jwt", { session: false }),
    validateBody(schemas.userChangePassword),
    userController.changePassword
);

module.exports = router;
