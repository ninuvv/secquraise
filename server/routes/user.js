import express from "express";
const router = express.Router();

import { createUser, updateUser, getUsersBySearch, getUsers, deleteUser} from "../controllers/user.js";


router.get("/search",getUsersBySearch);
router.post("/create",createUser);
router.delete("/:id", deleteUser);
router.get("/getAllUsers",getUsers);
router.get("/getUserDetails/:id",getUsers);
router.post("/update/:id",updateUser);


export default router;
