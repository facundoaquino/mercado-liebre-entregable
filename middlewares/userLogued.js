const userLogued = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

const userIsLogin = (req, res, next) => {
  if (req.session.user) {
   
    res.redirect("/profile");
   }else{
     next()
   }
};

module.exports = {userLogued,userIsLogin};
