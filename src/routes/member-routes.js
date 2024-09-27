const express = require("express");
const memberController = require("../controller/member-controller");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Members
 *     description: API for managing members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     tags: [Members]
 *     summary: Get all members with their borrowed book count
 *     description: Returns all members along with the count of books they are currently borrowing.
 *     responses:
 *       200:
 *         description: A list of members
 */
router.get("/", memberController.getAllMembers);

module.exports = router;
