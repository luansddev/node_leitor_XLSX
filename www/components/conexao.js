const firebaseConfig = {
  apiKey: "AIzaSyAkBkdWs_5vJChmZBesM2Ub8CnOFeXNuI0",
  authDomain: "gryfo-app.firebaseapp.com",
  projectId: "gryfo-app",
  storageBucket: "gryfo-app.appspot.com",
  messagingSenderId: "16245879118",
  appId: "1:16245879118:web:4c8dd698305826cb7d2e1f"
};

            const app = firebase.initializeApp(firebaseConfig);
            const db = firebase.firestore(app);
            const auth = firebase.auth(app); 