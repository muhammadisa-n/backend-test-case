const bookService = require("../service/book-services");
const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBookByCode: async (req, res) => {
    try {
      const book = await bookService.findBookByCode(req.params.bookCode);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = bookController;
