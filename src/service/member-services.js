const prisma = require("../utils/database");

module.exports = {
  getAllMember: async () => {
    const members = await prisma.member.findMany({
      include: {
        borrowings: {
          where: {
            returnedAt: null,
          },
        },
      },
    });
    const memberWithBorrowingCount = members.map((member) => ({
      code: member.code,
      name: member.name,
      borrowedBooksCount: member.borrowings.length,
    }));

    return memberWithBorrowingCount;
  },
};
