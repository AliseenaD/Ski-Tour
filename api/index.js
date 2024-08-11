import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Initialize firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-R5CC7MRVHN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

// this endpoint is used by the client to verify the user status and to make sure the user is registered in our database once they signup with Auth0
// if not registered in our database we will create it.
// if the user is already registered we will return the user information
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  // we are using the audience to get the email and name from the token
  // if your audience is different you should change the key to match your audience
  // the value should match your audience according to this document: https://docs.google.com/document/d/1lYmaGZAS51aeCxfPzCwZHIk6C5mmOJJ7yHBNPJuGimU/edit#heading=h.fr3s9fjui5yn
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });

    res.json(newUser);
  }
});

// Get photos for the mountains
app.get('/api/image-url', async (req, res) => {
  const imagePath = req.query.path;
  if (!imagePath) {
    return (res.status(400).json({error: 'Image path is required'}));
  }
  try {
    const storage = getStorage(firebase);
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    res.json({url});
  }
  catch(error) {
    console.log("Error generating url: " + error);
  }
});

// Edit user info, will require auth
app.put("/user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { name, skierType, skierLevel } = req.body;
  // Ensure valid data
  if (!name || !skierType || !skierLevel) {
    return res.status(400).json({ error: "Invalid user input" });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        auth0Id,
      },
      data: {
        name,
        skierType,
        skierLevel
      }
    });
    res.json(updatedUser);
  }
  catch(error) {
    console.log(error);
  }
});

// Get user info, will be used to obtain reviews, profile info, and bucket-list mountains, will require auth
app.get("/user", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const userInfo = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
      include: {
        reviews: {
          include: {
            mountain: true // Include mountain details
          }
        },
        bucketList: {
          include: {
            mountain: {
              include: {
                reviews: true
              }
            }
          }
        }
      }
    });
    res.json(userInfo);
  }
  catch(error) {
    console.log(error);
  }
});

// Get a specific user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        reviews: {
          include: {
            mountain: true,
          }
        }
      }
    });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userData);
  }
  catch (error) {
    console.log(error);
  }
});


// Get specific info on mountains, no auth needed
app.get("/mountains/:mountainId", async (req, res) => {
  try {
    const mountainId = parseInt(req.params.mountainId);
    // Validate data
    if (isNaN(mountainId)) {
      return res.status(400).json({ error: "Invalid mountain ID" });
    }
    const mountainInfo = await prisma.mountain.findUnique({
      where: {
        id: mountainId,
      },
      include: { // Include all reviews and specific author informatino to be presented
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                skierLevel: true,
                skierType: true,
              }
            }
          }
        }
      }
    });
    res.json(mountainInfo);
  }
  catch(error) {
    console.log(error);
  }
});

// Get info regarding mountains, will not need userAuth to do this
app.get("/mountains", async (req, res) => {
  try {
    const mountains = await prisma.mountain.findMany({
      include: {
        reviews: true // include reviews for sorting purposes on the home page
      }
    });
    res.json(mountains);
  }
  catch(error) {
    console.log(error);
  }
});

// Delete bucket-list mountain, authentication required
app.delete("/bucket-list/:mountainId", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const mountainId = parseInt(req.params.mountainId);
    // Validate data
    if (isNaN(mountainId)) {
      return res.status(400).json({ error: "Invalid mountain ID" });
    }
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    })
    if (!user) {
      return ref.status(404).json({ error: "User not found" });
    }
    const deletedItem = await prisma.bucketList.deleteMany({
      where: {
        authorId: user.id,
        mountainId: mountainId
      }
    });
    res.json(deletedItem);
  }
  catch (error) {
    console.log(error);
  }
});

// Post a new bucketlist item, does require authorization
app.post("/bucket-list/:mountainId", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const mountainId = parseInt(req.params.mountainId);
  // Validate data
  if (isNaN(mountainId)) {
    return res.status(400).json({ error: "Invalid mountain ID" });
  }
  try {
    const bucketListItem = await prisma.bucketList.create({
      data: {
        author: { connect: { auth0Id } },
        mountain: { connect: { id: mountainId } }
      }
    });
    res.json(bucketListItem);
  }
  catch (error) {
    console.log(error);
  }
});

// Post a review, does require authorization
app.post("/reviews/:mountainId", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const mountainId = parseInt(req.params.mountainId);
  const { title, rating } = req.body
  // Validate data
  if (isNaN(mountainId)) {
    return res.status(400).json({ error: "Invalid mountain ID" });
  }
  if (!title || !rating) {
    return res.status(400).json({ error: "Invalid body info" })
  }
  try {
    const reviewItem = await prisma.reviewItem.create({
      data: {
        title,
        rating,
        author: { connect: { auth0Id } },
        mountain: { connect: { id: parseInt(mountainId) } }
      }
    });
    res.json(reviewItem);
  }
  catch (error) {
    console.log(error);
  }
})

// Delete a review
app.delete("/reviews/:reviewId", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const reviewId = parseInt(req.params.reviewId);
  if (isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid review ID" });
  }
  try {
    const userData = await prisma.user.findUnique({
      where: { auth0Id },
    })
    if (!userData) {
      return ref.status(404).json({ error: "User not found" });
    }
    const deletedReview = await prisma.reviewItem.delete({
      where: {
        authorId: userData.id,
        id: reviewId
      }
    });
    if (deletedReview.count === 0) {
      return res.status(404).json({ error: "Review not found or not authorized to delete" });
    }
    res.json(deletedReview);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting the review" });
  }
})

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});