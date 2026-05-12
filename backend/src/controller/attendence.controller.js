const jwt = require("jsonwebtoken")

const attendmodel =
require("../model/attendence.model")

const usermodel =
require("../model/usermodel")

const QRCode = require("qrcode")
async function scanattendence(req, res) {
  try {
    const token = req.cookies.tokens;

    if (!token) {
      return res.status(401).json({ message: "token expired relogin" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "unauthorised access" });
    }

    const user = await usermodel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // ACTIVE SESSION
    const activeSession = await attendmodel.findOne({
      user: user._id,
      status: "INSIDE",
    });

    // EXIT
    if (activeSession) {
      activeSession.exittime = new Date();
      activeSession.status = "OUTSIDE";
      await activeSession.save();

      return res.status(200).json({
        message: "exit successful",
        attendance: activeSession,
      });
    }

    // ENTRY
    const attendance = await attendmodel.create({
      user: user._id,
      gymcode: user.gymcode,
      entrytime: new Date(),
      status: "INSIDE",
      date: new Date().toISOString().split("T")[0],
    });

    res.status(201).json({
      message: "entry successful",
      attendance,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
    scanattendence
}