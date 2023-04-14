import express, { request } from "express";
import {join} from "path";
import path from "path";
const __dirname = path.resolve();
const app = express();

app.use("/assets",express.static(join(__dirname,"public")));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Blogger app");
});

app.get("/admin/login",(req,res)=>{
    res.sendFile(join(__dirname,"views","login.html"));
}).post("/admin/login",(req,res)=>{
    res.send("handle login");
})

app.listen(3000, () => console.log("Listening on port 3000"));
