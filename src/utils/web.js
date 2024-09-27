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
  },
  apis: [path.join(__dirname, "../routes", "*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/borrowing", borrowingRoutes);
module.exports = app;
