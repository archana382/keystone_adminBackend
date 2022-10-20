const express = require("express");
const { loginUser, registerUser, createUser, updateUser, deleteUser, getUserDetails } = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/authentication");
const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/user/add").post(createUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("user/:id")
.put(updateUser)
.delete(deleteUser);



module.exports =  router;
