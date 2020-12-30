const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const {  User } = require("./models/user");

app.use(express.static("public"));
app.use(express.static("uploads"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.set("view engine", "ejs");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected!"));



/*----Home Page----*/
app.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect("/profile");
  }else{
    res.render("index");
  }
});

/*-------sign up--------*/
app.post("/signup",(req,res)=>{
  const user = new User(req.body)
  console.log(user);
  user.save((err, user)=>{
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.json(user)
  })
});





/*----Google Auth CallBack----*/
app.get(
  "/auth/google/account",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

/*----sign in Page----*/
app.get("/login", (req, res) => {
      res.render("login");
});



/*----logout----*/
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});




/*----server----*/
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app is running on port 3000");
});