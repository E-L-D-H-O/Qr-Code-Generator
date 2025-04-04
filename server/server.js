require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("❌ Missing MONGO_URI or JWT_SECRET in .env file.");
    process.exit(1);
}


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("users", UserSchema);



//Signup
app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error during login." });
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
