
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const officerId = "6b004e1a839f48a71781dbe9";

        const newPassword = "Officer@12345";

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const officer = await User.findByIdAndUpdate(
            officerId,
            { password: hashedPassword },
            { new: true }
        );

        if (!officer) {
            console.log("District officer not found");
            return;
        }

        console.log("Officer password reset successfully");
        console.log("Officer email:", officer.email);
        console.log("Officer role:", officer.role);

    } catch (error) {
        console.error("Password reset failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

resetPassword();
