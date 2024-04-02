
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDMNbiEp4adNMztUT8DmPVGj_ZEnnqNts8",
    authDomain: "chat-web-addbe.firebaseapp.com",
    projectId: "chat-web-addbe",
    storageBucket: "chat-web-addbe.appspot.com",
    messagingSenderId: "869436251555",
    appId: "1:869436251555:web:2e8e668690a64bd0268e16"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

