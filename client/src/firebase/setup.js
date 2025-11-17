import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIlEHGQBSG_3FLGdCeBvUyUNNKTijuNhU",
  authDomain: "g-culture-63874.firebaseapp.com",
  projectId: "g-culture-63874",
  storageBucket: "g-culture-63874.firebasestorage.app",
  messagingSenderId: "375655445698",
  appId: "1:375655445698:web:90e8d0b217930db320775b",
  measurementId: "G-TVP3TW9F41"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)