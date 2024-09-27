const request = require("supertest");
const app = require("../src/utils/web");
const prisma = require("../src/utils/database");
const { createBooks, createMembers } = require("../src/utils/test-utils");
describe("Borrowing Books", () => {
  beforeEach(async () => {
    await createBooks();
    await createMembers();
  });
  afterEach(async () => {
    await prisma.borrowing.deleteMany();
    await prisma.book.deleteMany();
    await prisma.member.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should allow member to borrow a book if conditions are met", async () => {
    const res = await request(app).post("/api/borrowing/borrow").send({
      memberCode: "M001",
      bookCode: "JK-45",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Book borrowed successfully");
  });

  test("should not allow member to borrow more than 2 books", async () => {
    await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M001", bookCode: "JK-45" });

    await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M001", bookCode: "SHR-1" });

    const res = await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M001", bookCode: "TW-11" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Cannot borrow more than 2 books");
  });

  test("should not allow borrowing a book already borrowed by another member", async () => {
    await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M002", bookCode: "JK-45" });

    const res = await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M001", bookCode: "JK-45" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Book not available");
  });

  test("should not allow member with penalty to borrow a book", async () => {
    await prisma.member.update({
      where: { code: "M003" },
      data: { penaltyUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    });
    const res = await request(app)
      .post("/api/borrowing/borrow")
      .send({ memberCode: "M003", bookCode: "HOB-83" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Member is currently under penalty.");
  });
});
