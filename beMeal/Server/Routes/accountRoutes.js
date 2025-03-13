import express from "express";
import { registerAccount } from "../Authentication/registerAccount.js";
import { loginAccount } from "../Authentication/loginAccount.js";
import { deleteAccount } from "../Authentication/deleteAccount.js";
import { updateUserName } from "../Authentication/updateUserName.js";
import { updatePassword } from "../Authentication/updatePassword.js";

const router = express.Router();

// User authentication routes
router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.delete("/delete", deleteAccount);
router.put("/updateUserName", updateUserName);
router.put("/updatePassword", updatePassword);

export default router;