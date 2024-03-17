import { Router } from "express";
import { compileData } from "../controllers/compile.controllers.js";


const router = Router()

router.route('/compile-data')
      .post(compileData)


export default router