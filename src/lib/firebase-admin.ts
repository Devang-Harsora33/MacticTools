import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: "mactictools-28453",
    clientEmail: "firebase-adminsdk-fbsvc@mactictools-28453.iam.gserviceaccount.com",
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  storageBucket: "mactictools-28453.firebasestorage.app"
};

export const initAdmin = () => {
  if (!getApps().length) {
    initializeApp(firebaseAdminConfig);
  }
}; 