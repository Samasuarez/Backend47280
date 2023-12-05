import {Router} from "express"
import { requestPasswordRecovery, resetPass} from "../controllers/passwordRecovey.controllers.js"

const recovPassRoter = Router()

recovPassRoter.get("/recoveryPass", requestPasswordRecovery )
recovPassRoter.post("/reset-password/:token", resetPass)

export default recovPassRoter