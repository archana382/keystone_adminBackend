const express = require("express");
const { loginUser, registerUser, createUser, updateUser, deleteUser, getUserDetails, getSingleUser, getAllUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/authentication");
const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/admin/add").post(isAuthenticatedUser,authorizedRoles("admin"), createUser);

router
.route("/admin/users")
.get(isAuthenticatedUser,authorizedRoles("admin"), getAllUser);

router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizedRoles("admin"), getSingleUser)
.put(isAuthenticatedUser,authorizedRoles("admin"), updateUser)
.delete(isAuthenticatedUser,authorizedRoles("admin"), deleteUser);



module.exports =  router;
