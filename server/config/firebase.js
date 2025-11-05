import admin from "firebase-admin";
import "dotenv/config"



const serviceAccount = JSON.parse(process.env.FIREBASE_KEY)

// to change servicesAccount file into env one line code
// node -e "console.log(JSON.stringify(require('./serviceAccountKey.json')))"


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}



export default admin;