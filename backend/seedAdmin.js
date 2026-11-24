
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error("Admin environment variables are missing");
        }

        if (ADMIN_PASSWORD.length < 8) {
            throw new Error("Admin password must contain at least 8 characters");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const existingAdmin = await User.findOne({
            email: ADMIN_EMAIL.toLowerCase()
        });

        if (existingAdmin) {
            console.log("An account with this email already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

        const admin = await User.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL.toLowerCase(),
            password: hashedPassword,
            role: "ADMIN",
            state: null,
            district: null
        });

        console.log("Administrator created successfully!");
        console.log("Admin ID:", admin._id);
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

    } catch (error) {
        console.error("Admin creation failed:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
