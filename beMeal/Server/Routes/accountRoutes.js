import express from "express";
import { registerAccount } from "../Accounts/registerAccount.js";
import { loginAccount } from "../Accounts/loginAccount.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerAccount);
router.post("/login", loginAccount);

export default router;
