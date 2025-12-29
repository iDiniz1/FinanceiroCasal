import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIeR1aF8rR2qs6l_Oo_eez8sJFrEgjy2s",
  authDomain: "financas-afe61.firebaseapp.com",
  projectId: "financas-afe61",
  storageBucket: "financas-afe61.firebasestorage.app",
  messagingSenderId: "625744485806",
  appId: "1:625744485806:web:9f9ab3d7a0ab18e807fc3f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
