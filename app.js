import express, { request } from "express";
import { join } from "path";
import path from "path";
const __dirname = path.resolve();
import morgan from "morgan";
import { createWriteStream } from "fs";
import session from "express-session";
import compression from "compression";
import home from "./routes/home/index.js";
import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";

const app = express();

const logFile = join(__dirname, "blogger.log");

//record site navigation logs on console

//app.use(morgan("d:method - :url - :date - :response-time ms"));

// write log details on a file named logfile
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);

app.use(compression());
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mounting session middleware to admin route
app.use(
  "/admin",
  session({
    name: "sessId",
    resave: false,
    saveUninitialized: true,
    secret:
      app.get("env") === "production"
        ? process.env.sessionSecret
        : "2bb375d5abe58776bbf28695",
    cookie: {
      secure: app.get("env") === "production" ? true : false,
      httpOnly: true,
      maxAge: 18000000, // 5 hours
    },
  })
);

app.set("view engine", "pug");

app.use("/", home);
app.use("/admin", admin);
app.use("/api", api);

app.listen(3000, () => console.log("Listening on port 3000"));
