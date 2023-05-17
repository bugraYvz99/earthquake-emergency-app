const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const token = await authService.loginUser(phoneNumber, password);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
};

exports.loginAsVolunteer = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    console.log(req.body.lastname)
    const token = await authService.loginAsVolunteer(
      firstName,
      lastName,
      phoneNumber
    );
console.log(token)
    const response = {
      firstName,
      lastName,
      phoneNumber,
      token,
    };
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Can not Login" });
  }
};
