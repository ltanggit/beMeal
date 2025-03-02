import express from "express";
import { registerAccount } from "../Authentication/registerAccount.js";
import { loginAccount } from "../Authentication/loginAccount.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerAccount);
router.post("/login", loginAccount);

export default router;
