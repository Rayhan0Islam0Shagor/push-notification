import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBX8uXPXcDk8oTS894oP6T4lj4mO24YvHE',
  authDomain: 'fcm-demo-045.firebaseapp.com',
  projectId: 'fcm-demo-045',
  storageBucket: 'fcm-demo-045.appspot.com',
  messagingSenderId: '962647026271',
  appId: '1:962647026271:web:bd74bb51437fee60fd09ea',
  measurementId: 'G-1WL69XWE4Q',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
};

export { app, messaging };
