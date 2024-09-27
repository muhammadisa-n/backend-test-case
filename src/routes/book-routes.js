const express = require("express");
const bookController = require("../controller/book-controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: API for managing books
 */
/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Get all available books
 *     description: returns all books along with their available stock (excluding borrowed books).
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get("/", bookController.getAllBooks);

module.exports = router;
