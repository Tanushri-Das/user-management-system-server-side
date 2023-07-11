// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tdjlbxg.mongodb.net/userManagement?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const userCollection = client.db("userManagement").collection("usersCollection");

//     app.get("/users", (req, res) => {
//       userCollection
//         .find()
//         .toArray()
//         .then((users) => res.json(users))
//         .catch((err) => res.status(500).json({ error: err.message }));
//     });

//     app.post("/users", (req, res) => {
//       const newUser = req.body;
//       userCollection
//         .insertOne(newUser)
//         .then((result) => res.json(result.ops[0]))
//         .catch((err) => res.status(500).json({ error: err.message }));
//     });
//     app.get("/users/:id", (req, res) => {
//       const userId = req.params.id;
//       const objectId = new ObjectId(userId);
//       userCollection
//         .findOne({ _id: objectId })
//         .then((user) => {
//           if (user) {
//             res.json(user);
//           } else {
//             res.status(404).json({ error: "User not found" });
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).json({ error: "Internal server error" });
//         });
//     });
//     app.delete('/users/:id', (req, res) => {
//       const userId = req.params.id;
//       const objectId = new ObjectId(userId);
//       userCollection
//         .deleteOne({ _id: objectId })
//         .then((result) => {
//           if (result.deletedCount === 1) {
//             res.json({ message: 'User deleted successfully' });
//           } else {
//             res.status(404).json({ error: 'User not found' });
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).json({ error: 'Internal server error' });
//         });
//     });    
    
//     app.get("/", async (req, res) => {
//       res.send("Survey app is running");
//     });

//     app.listen(port, () => {
//       console.log(`Survey app is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   }
// }

// run().catch(console.dir);



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

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("userManagement").collection("usersCollection");

    app.get("/users", (req, res) => {
      userCollection
        .find()
        .toArray()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    app.post("/users", (req, res) => {
      const newUser = req.body;
      userCollection
        .insertOne(newUser)
        .then((result) => res.json(result.ops[0]))
        .catch((err) => res.status(500).json({ error: err.message }));
    });
    app.get("/users/:id", (req, res) => {
      const userId = req.params.id;
      const objectId = new ObjectId(userId);
      userCollection
        .findOne({ _id: objectId })
        .then((user) => {
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        });
    });
    app.put("/users/:id", (req, res) => {
      const userId = req.params.id;
      const objectId = new ObjectId(userId);
      const updatedUser = req.body;
      userCollection
        .updateOne({ _id: objectId }, { $set: updatedUser })
        .then(() => res.json({ message: "User updated successfully" }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });
    app.delete('/users/:id', (req, res) => {
      const userId = req.params.id;
      const objectId = new ObjectId(userId);
      userCollection
        .deleteOne({ _id: objectId })
        .then((result) => {
          if (result.deletedCount === 1) {
            res.json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        });
    });    
    
    app.get("/", async (req, res) => {
      res.send("Survey app is running");
    });

    app.listen(port, () => {
      console.log(`Survey app is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

run().catch(console.dir);

