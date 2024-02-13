import { Router } from "express";
import { createUser, logoutUser, userLogin } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route('/signup')
      .post(createUser)

router.route('/signin')
      .post(userLogin)

router.route('/signout')
      .post(verifyJWT, logoutUser)

export default router