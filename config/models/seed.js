require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("k@mb0j@PLG351", 12);

    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      existingAdmin.username = "smpxonesiswaguru";
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("✅ Username admin diubah menjadi smpxonesiswaguru");
    } else {
      await User.create({
        username: "smpxonesiswaguru",
        password: hashedPassword,
        role: "superadmin"
      });
      console.log("✅ Admin baru dibuat");
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
