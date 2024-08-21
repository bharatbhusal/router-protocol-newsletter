const express = require("express");
const newsController = require("../controllers/newsControllers");
const {
	authenticateToken,
} = require("../middlewares/auth");
const router = express.Router();

router.get("/", newsController.getAllNews);
// Create news
router.post(
	"/",
	authenticateToken,
	newsController.createNews
);

// Get news
router.post(
	"/user",
	authenticateToken,
	newsController.getNewsByUser
);
router.get("/:year/:month", newsController.getNewsOfMonth);
router.get("/:id", newsController.getNewsById);
// Get news
router.get(
	"/:year/:month/:day",
	newsController.getNewsByDay
);

// Get news of whole month

// Update news
router.put(
	"/:id",
	authenticateToken,
	newsController.updateNews
);

// Delete news
router.delete(
	"/:id",
	authenticateToken,
	newsController.deleteNews
);

module.exports = router;
