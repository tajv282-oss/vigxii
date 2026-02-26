const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
// Option 1: Use FIREBASE_SERVICE_ACCOUNT env var (JSON string)
// Option 2: Use GOOGLE_APPLICATION_CREDENTIALS env var (path to JSON file)
const initFirebase = () => {
  if (admin.apps.length > 0) return;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } else {
    // Fallback: initialize with individual env vars
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  console.log('Firebase Admin initialized');
};

initFirebase();

module.exports = admin;
