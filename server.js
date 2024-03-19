/**
 * Module dependencies
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 9000;
const router = express.Router();

app.use(router);

// Middleware to parse request body
router.use(bodyParser.urlencoded({ limit: "52428800", extended: true }));
router.use(bodyParser.json({ limit: "52428800" }));


// Load routes for /contratos
const contratosRouter = express.Router();
require("./server/config/routes")(contratosRouter);
app.use("/contratos", contratosRouter);

app.listen(port);

console.log(`Express app started on port ${port} - ${new Date()}`);
