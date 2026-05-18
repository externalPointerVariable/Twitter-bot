import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function fetchAndStoreTrends() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("twitter_bot");
    const trends = db.collection("trends");

    await trends.deleteMany({});

    const feed = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`,
    )
      .then((response) => response.json())
      .then((response) => response.articles);

    if (!feed || !Array.isArray(feed))
      throw new Error("Articles not found:", feed);

    const result = await trends.insertMany(feed);
    console.log(result.insertedCount);
  } catch (e) {
    console.error(e);
    process.exit(-1);
  } finally {
    await mongoClient.close();
    await process.exit(0);
  }
}

fetchAndStoreTrends();

export default fetchAndStoreTrends;
