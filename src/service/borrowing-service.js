const prisma = require("../utils/database");
module.exports = {
  borrowBook: async (memberCode, bookCode) => {
    const member = await prisma.member.findUnique({
      where: { code: memberCode },
    });
    if (member.penaltyUntil && member.penaltyUntil > new Date()) {
      throw new Error("Member is currently under penalty.");
    }

    const book = await prisma.book.findUnique({ where: { code: bookCode } });
    if (!book || book.stock <= 0) {
      throw new Error("Book not available");
    }

    const borrowedBooks = await prisma.borrowing.count({
      where: { memberCode },
    });

    if (borrowedBooks >= 2) {
      throw new Error("Cannot borrow more than 2 books");
    }

    const borrowing = await prisma.borrowing.create({
      data: {
        memberCode,
        bookCode,
      },
    });

    await prisma.book.update({
      where: { code: bookCode },
      data: { stock: book.stock - 1 },
    });

    return borrowing;
  },
  returnBook: async (memberCode, bookCode) => {
    const borrowing = await prisma.borrowing.findFirst({
      where: {
        memberCode: memberCode,
        bookCode: bookCode,
        returnedAt: null,
      },
      include: {
        book: true,
        member: true,
      },
    });

    if (!borrowing) {
      throw new Error("This book was not borrowed by the member");
    }

    const now = new Date();
    const borrowedAt = new Date(borrowing.borrowedAt);
    const daysBorrowed = Math.floor((now - borrowedAt) / (1000 * 60 * 60 * 24));
    await prisma.borrowing.update({
      where: { id: borrowing.id },
      data: {
        returnedAt: now,
      },
    });
    await prisma.book.update({
      where: { code: bookCode },
      data: {
        stock: borrowing.book.stock + 1,
      },
    });

    if (daysBorrowed > 7) {
      const penaltyEnd = new Date(now);
      penaltyEnd.setDate(now.getDate() + 3);
      await prisma.member.update({
        where: { code: borrowing.memberCode },
        data: {
          penaltyUntil: penaltyEnd,
        },
      });
      throw new Error("Book returned late. Member has been penalized 3 Days.");
    }
    return {
      message: "Book returned successfully",
    };
  },
};
