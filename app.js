import express, { request } from "express";
import { join } from "path";
import path from "path";
const __dirname = path.resolve();
import morgan from "morgan";
import { createWriteStream } from "fs";
const app = express();

const logFile = join(__dirname, "blogger.log");

//record site navigation logs on console
app.use(morgan("d:method - :url - :date - :response-time ms"));
// write log details on a file named logfile
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Blogger app");
});

app
  .get("/admin/login", (req, res) => {
    res.render("login");
  })
  .post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    console.log("E-Mail:", email);
    console.log("Password:", password);
    res.redirect("/admin/dashboard");
  });


app.get("/admin/dashboard", (req, res) => {
    res.render("dashboard", {
      user: " Raphael A",
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

app.post("/admin/approve",(req,res)=>res.redirect("/admin/dashboard"));


app.get("/admin/logout",(req,res)=>{
    res.redirect("/admin/login");
})

app.post("/api/posts", (req, res) => {
  console.log(req.body);
  res.json({ message: "Got it!" });
});

app.listen(3000, () => console.log("Listening on port 3000"));
