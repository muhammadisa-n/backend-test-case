const express = require("express");
const borrowingController = require("../controller/borrowing-controller");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Borrowing
 *     description: API for managing book borrowing
 */

/**
 * @swagger
 * /api/borrowing/borrow:
 *   post:
 *     tags: [Borrowing]
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error in borrowing book
 */
router.post("/borrow", borrowingController.borrowBook);

/**
 * @swagger
 * /api/borrowing/return:
 *   post:
 *     tags: [Borrowing]
 *     summary: Return a borrowed book
 *     description: Members can return books they have borrowed. Late returns will result in a penalty.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: Code of the member returning the book
 *               bookCode:
 *                 type: string
 *                 description: Code of the book being returned
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error returning book, possibly due to invalid data or penalty
 */
router.post("/return", borrowingController.returnBook);

module.exports = router;
