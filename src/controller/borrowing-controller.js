const borrowingService = require("../service/borrowing-service");

const borrowingController = {
  borrowBook: async (req, res) => {
    const { memberCode, bookCode } = req.body;
    try {
      await borrowingService.borrowBook(memberCode, bookCode);
      res.status(200).json({ message: "Book borrowed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  returnBook: async (req, res) => {
    const { memberCode, bookCode } = req.body;
    try {
      const result = await borrowingService.returnBook(memberCode, bookCode);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = borrowingController;
