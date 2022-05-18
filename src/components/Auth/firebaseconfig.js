
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDC5qXnC__g70fucqS11XJmWA3Y8ugiFp4",
    authDomain: "todo-list-21eea.firebaseapp.com",
    projectId: "todo-list-21eea",
    storageBucket: "todo-list-21eea.appspot.com",
    messagingSenderId: "431669911352",
    appId: "1:431669911352:web:fe36cf9d8df4a70bfc2bcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;