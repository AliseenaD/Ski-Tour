import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

dotenv.config();

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

const firebase = initializeApp(firebaseConfig);

async function migrateUrls() {
    try {
        // Get all the mountains
        const mountains = await prisma.mountain.findMany();
        const storage = getStorage(firebase);

        for (const mountain of mountains) {
            console.log(`${mountain.name} url: ${mountain.picture}`);
            if (mountain.picture && mountain.picture.startsWith('gs://')) {
                try {
                    const imagePath = mountain.picture.replace('gs://ski-tour-77d0f.appspot.com/', '');
                    const imageRef = ref(storage, imagePath);
                    const newUrl = await getDownloadURL(imageRef);
                    console.log(`${mountain.name} download URL: ${newUrl}`);

                    await prisma.mountain.update({
                        where: { id: mountain.id },
                        data: { picture: newUrl }
                    });

                    console.log(`Updated mountain ${mountain.name} with new URL: ${mountain.picture}`);
                }
                catch (error) {
                    console.error(`Failed to update mountain ${mountain.name}:`, error);
                }
            }
        }
    }
    catch(error) {
        console.error('Error migrating the urls:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

migrateUrls();