const router = require("express").Router();
const { signUp,signIn,signOut, loggedIn } = require("../controllers/auth");

router.post("/signup", signUp);

router.post("/login", signIn);

router.get("/logout", signOut);

router.get("/loggedIn", loggedIn);

module.exports = router;