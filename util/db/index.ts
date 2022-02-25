import admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_ADMIN as string
        );
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "YOUR_DB_URL"
        });
    } catch (error: any) {
        console.log('Firebase admin initialization error', error.stack);
    }
}
export default admin.firestore();