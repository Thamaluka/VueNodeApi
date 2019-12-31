const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();

  posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://dbUser:nico1805@cluster0-mwktk.mongodb.net/test",
    {
      userNewUrlParser: true
    }
  );

  return client.db("vue_express").collection("posts");
}
module.exports = router;
