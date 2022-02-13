import { readdirSync } from "fs";
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(
  helmet({
    frameguard: {
      action: "deny",
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter({}));

var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected."));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server listening at http://localhost:${port}`);
});
