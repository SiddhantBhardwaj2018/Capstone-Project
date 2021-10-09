import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC9QCIWxhWZkjcfxMPjWHsYOVY_MWmnNkY",
  authDomain: "cryptic-app-4cb73.firebaseapp.com",
  projectId: "cryptic-app-4cb73",
  storageBucket: "cryptic-app-4cb73.appspot.com",
  messagingSenderId: "149936248967",
  appId: "1:149936248967:web:f4e08411fd19540a5e8022",
  measurementId: "G-1KFV4GGFHV"
});

export default app;