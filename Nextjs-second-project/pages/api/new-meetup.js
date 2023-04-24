import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //U6RGijHetx2XcBwp;
    const uri =
      "mongodb+srv://stonks159:rgRQ1ScKb1a5Kodi@firstmongodb.aas5yex.mongodb.net/?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri);

    const collection = client.db("meetup").collection("meetups");

    const result = await collection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
