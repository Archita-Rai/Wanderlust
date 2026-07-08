const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  // for rendering signup form
  .get(userController.renderSignupForm)
  // for user signup
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // for rendering login form
  .get(userController.renderLoginForm)
  // for user login
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// for logout
router.get("/logout", userController.logout);

module.exports = router;
