const prisma = require("../utils/database");
module.exports = {
  getAllBooks: async () => {
    const books = await prisma.book.findMany({
      include: {
        borrowings: {
          where: {
            returnedAt: null,
          },
        },
      },
    });
    const availableBooks = books.map((book) => {
      const borrowedCount = book.borrowings.length;
      const availableStock = Math.max(book.stock - borrowedCount, 0);
      return {
        code: book.code,
        title: book.title,
        author: book.author,
        totalStock: book.stock,
        availableStock: availableStock,
      };
    });
    return availableBooks;
  },
};
