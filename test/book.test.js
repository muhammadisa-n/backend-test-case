const request = require("supertest");
const app = require("../src/utils/web");
const prisma = require("../src/utils/database");
const { createBooks } = require("../src/utils/test-utils");
describe("Test suite for books", () => {
  beforeEach(async () => {
    await createBooks();
  });
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  test("should fetch all books and show available stock", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty("availableStock");
  });
});
