import { MongoClient } from "mongodb";
import news from "gnews";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function fetchAndStoreTrends() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("twitter_bot");
    const trends = db.collection("trends");

    await trends.deleteMany({});

    const feed = await news.headlines({ n: 20, country: "IN" });
    feed.forEach(
      async (article) =>
        await trends.insertOne({
          Title: article.title,
          Content: article.content,
        }),
    );

    console.log("DONE");
  } catch (e) {
    console.error(e);
  } finally {
    return 0;
  }
}

fetchAndStoreTrends();

export default fetchAndStoreTrends;
