const User = require("../models/User");

// Search technicians by service and city
exports.searchTechnicians = async (req, res) => {
  try {

    const { service, city } = req.query;

    const technicians = await User.find({
      role: "technician",
      service: service,
      "location.city": city
    }).select("-password");

    res.json(technicians);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};