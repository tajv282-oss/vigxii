require('dotenv').config();
const admin = require('firebase-admin');

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

async function getWebConfig() {
  try {
    const token = (await admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }).getAccessToken()).access_token;

    // List web apps
    const listRes = await fetch(`https://firebase.googleapis.com/v1beta1/projects/vigxii-visuals/webApps`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const listData = await listRes.json();
    console.log('Web Apps:', JSON.stringify(listData, null, 2));

    if (listData.apps && listData.apps.length > 0) {
      const appName = listData.apps[0].name;
      // Get config for first web app
      const configRes = await fetch(`https://firebase.googleapis.com/v1beta1/${appName}/config`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const configData = await configRes.json();
      console.log('\nWeb App Config:', JSON.stringify(configData, null, 2));
    } else {
      console.log('\nNo web apps found. Trying to get the API key from Identity Toolkit...');
      // Try getting the API key from the project
      const apiKeyRes = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/vigxii-visuals/config`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apiKeyData = await apiKeyRes.json();
      console.log('Identity config:', JSON.stringify(apiKeyData, null, 2));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

getWebConfig();
