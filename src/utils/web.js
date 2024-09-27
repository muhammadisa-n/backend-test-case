const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bookRoutes = require("../routes/book-routes");
const memberRoutes = require("../routes/member-routes");
const borrowingRoutes = require("../routes/borrowing-routes");
const path = require("path");
const app = express();
app.use(express.json());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Books Management API",
      version: "1.0.0",
      description: "API for managing books and members",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes", "*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/api", (req, res) => {
  return res.json({
    message: "Server Its Works",
    author: "Muhammad Isa",
  });
});
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/borrowing", borrowingRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Request not found",
  });
});

module.exports = app;
