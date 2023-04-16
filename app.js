import express, { request } from "express";
import { join } from "path";
import path from "path";
const __dirname = path.resolve();
import morgan from "morgan";
import { createWriteStream } from "fs";
import session from "express-session";
import compression from "compression";
import protectRoute from "./utils/protectRoute.js";
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

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Blogger app");
});

//checking for a logged in admin

app
  .get("/admin", (req, res) => {
    if (req.session.user) {
      return res.redirect("/admin/dashboard");
    }

    res.redirect("/admin/login");
  })
  .get("/admin/login", (req, res) => {
    res.render("login");
  })
  .post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    //implementing server side sessions using hard coded values
    if (email === "homer@springfield.com" && password === "donuts") {
      req.session.user = "Raphael A";
      return res.redirect("/admin/dashboard");
    }
    res.redirect("/admin/dashboard");
  });

app.get("/admin/dashboard", protectRoute("/admin/login"), (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
    posts: [
      {
        id: 1,
        author: "Joe M",
        title: "I love Express",
        content: "Express is a wonderful framework for building Node.js apps",
      },
      {
        id: 2,
        author: "Mike F",
        title: "Have you tried Pug?",
        content:
          "I recently tried the Pug templating language and its excellent",
      },
    ],
  });
});

app
  .get("/admin/logout", (req, res) => {
    delete req.session.user;
    res.redirect("/admin/login");
  })
  .post("/admin/approve", (req, res) => res.redirect("/admin/dashboard"));

app.post("/api/posts", (req, res) => {
  console.log(req.body);
  res.json({ message: "Got it!" });
});

app.listen(3000, () => console.log("Listening on port 3000"));
