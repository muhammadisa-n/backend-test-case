const request = require("supertest");
const app = require("../src/utils/web");
const prisma = require("../src/utils/database");
const { createBooks, createMembers } = require("../src/utils/test-utils");
describe("Returning Books", () => {
  beforeEach(async () => {
    if (prisma.book.count == 0) {
      await createBooks();
    }
    if (prisma.book.count == 0) {
      await createMembers();
    }
    await prisma.borrowing.create({
      data: {
        memberCode: "M001",
        bookCode: "JK-45",
        borrowedAt: new Date(),
      },
    });

    await prisma.borrowing.create({
      data: {
        memberCode: "M001",
        bookCode: "SHR-1",
        borrowedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
    });
  });
  afterEach(async () => {
    await prisma.borrowing.deleteMany();
    await prisma.book.deleteMany();
    await prisma.member.deleteMany();
    await createBooks();
    await createMembers();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  test("should allow member to return borrowed book", async () => {
    const res = await request(app).post("/api/borrowing/return").send({
      memberCode: "M001",
      bookCode: "JK-45",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Book returned successfully");
  });

  test("should not allow member to return a book they did not borrow", async () => {
    const res = await request(app).post("/api/borrowing/return").send({
      memberCode: "M002",
      bookCode: "HOB-83",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "This book was not borrowed by the member"
    );
  });

  test("should penalize member if returning book after more than 7 days", async () => {
    const res = await request(app).post("/api/borrowing/return").send({
      memberCode: "M001",
      bookCode: "SHR-1",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Book returned late. Member has been penalized 3 Days."
    );
  });
});
