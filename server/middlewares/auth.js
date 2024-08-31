const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (userId, email) => {
	const secretKey = process.env.JWT_KEY;
	const dataToSign = `${userId}_${email}`;
	const token = jwt.sign({ dataToSign }, secretKey);
	return token;
};
const verifyToken = (token) => {
	const secretKey = process.env.JWT_KEY;
	try {
		const decoded = jwt.verify(token, secretKey);
		const dataToSign = decoded.dataToSign;
		const [userId, email] = dataToSign.split("_");
		return { userId, email };
	} catch (error) {
		return { userId: "", email: "" };
	}
};

const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const { userId, email } = verifyToken(token);
	if (!userId || !email) {
		return res.status(403).json({ message: "Invalid token" });
	}

	try {
		const user = await User.findOne({ _id: userId, email });
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid token" });
		} else if (!user.isReporter) {
			return res.status(403).json({
				message:
					"Non-reporter can't Add, Edit or Delete news. Contact Admin for promotion to Reporter.",
			});
		}
		req.user = user; // Attach user object to request for further processing

		next();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error" });
	}
};

module.exports = {
	generateToken,
	verifyToken,
	authenticateToken,
};
