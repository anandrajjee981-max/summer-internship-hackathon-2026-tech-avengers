const jwt = require("jsonwebtoken");
const attendmodel = require("../model/attendence.model");
const usermodel = require("../model/usermodel");

async function scanattendence(req, res) {
  try {
    const token = req.cookies.tokens;
    const { gymcode } = req.body; 

    if (!token) {
      return res.status(401).json({ message: "Session expired, please login again" });
    }

    if (!gymcode) {
      return res.status(400).json({ message: "No scanner barcode/data received" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized access token" });
    }

    const user = await usermodel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // ✅ FIX: Clean and normalize both strings before checking
    const savedCode = String(user.gymcode).trim().toLowerCase();
    const scannedCode = String(gymcode).trim().toLowerCase();

    console.log(`[DEBUG] DB Code: "${savedCode}" | Scanned Code: "${scannedCode}"`);

    // Case-insensitive matching to prevent false rejection crashes
    if (savedCode !== scannedCode) {
      return res.status(403).json({ 
        message: `Invalid gym code scan. Database expected: ${user.gymcode}, but Scanner read: ${gymcode}` 
      });
    }

    // CHECK FOR ACTIVE "INSIDE" SESSION FOR EXIT TRIGGER
    const activeSession = await attendmodel.findOne({
      user: user._id,
      status: "INSIDE",
    });

    // IF INSIDE, TRIGGER EXIT LOGIC
    if (activeSession) {
      activeSession.exittime = new Date();
      activeSession.status = "OUTSIDE";
      await activeSession.save();

      return res.status(200).json({
        message: "Exit registration successful!",
        attendance: activeSession,
      });
    }

    // IF OUTSIDE, TRIGGER ENTRY LOGIC
    const attendance = await attendmodel.create({
      user: user._id,
      gymcode: user.gymcode,
      entrytime: new Date(),
      status: "INSIDE",
      date: new Date().toISOString().split("T")[0],
    });

    return res.status(201).json({
      message: "Entry registration successful!",
      attendance,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  scanattendence
};