const User = require("../models/user")

// for rendering signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// for signup
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    //   console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to the Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// for rendering login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// for login
module.exports.login = async (req, res) => {
  // res.send("Welcome to wanderlust you are loged in ")
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// for logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
};
