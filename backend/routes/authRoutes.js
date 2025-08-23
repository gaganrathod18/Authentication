import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login an existing user
router.post("/login", loginUser);

// i did this 👇 during frontend setup  
router.get("/me", protect, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// for dashboard 👆

router.get('/', async (req,res)=>{
    return res.json({
        success: true,
        message: "Routes are Working"
    })
})

export default router;


