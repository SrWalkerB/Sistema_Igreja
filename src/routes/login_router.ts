import { Router } from "express";
import Login_Controllers from "../Controllers/Login_Controllers";

const login_router = Router();


login_router.post("/login", Login_Controllers.login_account);

login_router.post("/create/account", Login_Controllers.create_account);



export default login_router;