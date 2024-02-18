import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDycvaz3v33mcTP5pDSSe0R5PY5mw4sabE",
  authDomain: "foi-hackthon.firebaseapp.com",
  projectId: "foi-hackthon",
  storageBucket: "foi-hackthon.appspot.com",
  messagingSenderId: "889666939301",
  appId: "1:889666939301:web:c618ee8ef6015ee5b6604c",
  measurementId: "G-JVCT6QX0QL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const result = await signInWithPopup(auth, provider);
        const mailstrip = result.user.email.split("@");
        const mailUid = result.user.uid;
        if(mailstrip[1] !== "gmail.com" || mailstrip[0] === "vasishtpranav.udathu"){
            return{
                uid: mailUid,
                displayName:"a person from "+ mailstrip[1].split(".")[0],
            }
        }
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages };