// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjWFpY-Km3xMjcBJ1Opfo6jCfU2TVlbvw",
    authDomain: "eduard-5cbe7.firebaseapp.com",
    projectId: "eduard-5cbe7",
    storageBucket: "eduard-5cbe7.appspot.com",
    messagingSenderId: "778848399238",
    appId: "1:778848399238:web:e30e4b6c14e40ad0908607"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)

export default getFirestore();
