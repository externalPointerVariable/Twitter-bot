import "dotenv/config";
import express from "express";
import Twitter_Post from "./Twitter_Post.js";
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from Twitter Bot.");
});

app.get("/callback", (req, res) => {
  res.status(200).send("Redirection request...");
});

app.post("/twitter-post", async (req, res) => {
  try {
    const response = await Twitter_Post();
    return res.status(200).send("Success");
  } catch (e) {
    console.error(e);
    return res.status(404).send(e);
  }
});

app.listen(3000, () => {
  console.log("Connection Successful!!!");
});
