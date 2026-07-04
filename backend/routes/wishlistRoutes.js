const { addToWishlist, getWishlist, removeFromWishlist } =  require("../controllers/wishlistController.js");
const protect = require("../middleware/authMiddleware.js");

const express = require("express");

const router = express.Router();


router.post("/", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:bookId", protect, removeFromWishlist);

module.exports = router;

