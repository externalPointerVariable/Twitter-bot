import "dotenv/config";
import { MongoClient } from "mongodb";
import { Client, OAuth1 } from "@xdevplatform/xdk";
import fetchContent from "./Fetch_content.js";
import { TwitterApi } from "twitter-api-v2";

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function getContent() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("twitter_bot");
    const trends = db.collection("trends");

    const trendItem = await trends.findOneAndDelete({});

    const postContent = await fetchContent(trendItem);
    return postContent;
  } catch (e) {
    console.error(e);
    return error;
  }
}

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
  bearerToken: process.env.X_BEARER,
});

export default async function Twitter_Post() {
  try {
    const postText = await getContent();

    const rwClient = client.readWrite;

    const response = await rwClient.v2.tweet(postText);
    return 0;
  } catch (e) {
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

Twitter_Post();
