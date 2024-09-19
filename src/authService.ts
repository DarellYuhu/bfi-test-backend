import express from "express";
import bcrypt from "bcrypt";
import prisma from "../database";

const authService = express.Router();

authService.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    return res.json({ message: "Account Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

authService.post("sign-in", (req, res) => {});

export default authService;
