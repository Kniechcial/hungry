import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD_cP19pev77jgwCrflWmETpJGIXqNLSEo",
	authDomain: "hungry-19f55.firebaseapp.com",
	projectId: "hungry-19f55",
	storageBucket: "hungry-19f55.appspot.com",
	messagingSenderId: "145348563807",
	appId: "1:145348563807:web:3858291a33ad51258d5cea",
	measurementId: "G-B1PZG7VVME",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// sprawdza czy uzytkownik jest zalogowany
function getCurrentUser() {
	const auth = getAuth();
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(user);
			},
			reject
		);
	});
}

export { db, auth, getCurrentUser };
