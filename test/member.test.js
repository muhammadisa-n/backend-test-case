const request = require("supertest");
const app = require("../src/utils/web");
const prisma = require("../src/utils/database");
const { createMembers } = require("../src/utils/test-utils");
describe("Check Members", () => {
  beforeEach(async () => {
    const countmember = await prisma.member.count();
    if (countmember === 0) {
      return await createMembers();
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  test("should return all members with their borrowed book count", async () => {
    const res = await request(app).get("/api/members");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty("borrowedBooksCount");
    expect(res.body[0].borrowedBooksCount).toBeGreaterThanOrEqual(0);
  });
});
