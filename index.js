// server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tdjlbxg.mongodb.net/userManagement?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("User Management System is running");
});

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");
    const users = await userCollection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");
    const newUser = req.body;
    const result = await userCollection.insertOne(newUser);
    res.json(result.ops[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");
    const userId = req.params.id;
    const objectId = new ObjectId(userId);
    const user = await userCollection.findOne({ _id: objectId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");
    const userId = req.params.id;
    const objectId = new ObjectId(userId);
    const updatedUser = req.body;
    await userCollection.updateOne({ _id: objectId }, { $set: updatedUser });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");
    const userId = req.params.id;
    const objectId = new ObjectId(userId);
    const result = await userCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`User Management System is running on port ${port}`);
});
