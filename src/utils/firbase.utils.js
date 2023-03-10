// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  addDoc,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYybxgyFSp1PxUMToprmsKgk5a3__gfw0",
  authDomain: "chat-app-94eea.firebaseapp.com",
  projectId: "chat-app-94eea",
  storageBucket: "chat-app-94eea.appspot.com",
  messagingSenderId: "114953478964",
  appId: "1:114953478964:web:c5aeae7a348cbf3f983b61"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGooglepopup = () => {
  signInWithPopup(auth, provider);
};
const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const snapShot = await getDoc(userDocRef);
  if (!snapShot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        uid,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return snapShot.data();
  }
  
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onSignOut = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
export const getUsersCollection = async (user) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("uid", "not-in", [user.uid]));
  const snapShot = await getDocs(q);
  const users = [];
  snapShot.docs.map((docsnapshot) => {
    users.push(docsnapshot.data());
  });
  return users;
};

export const createChatData = async (sender, reciver, text, combinedId ) => {
  try {
    await addDoc(collection(db, "messages", combinedId, "chat"), {
      text,
      from: sender,
      to: reciver,
      
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log(error);
  }
};


export const getChatCollection = async (combinedId) =>{
  const collectionRef = collection(db ,'messages' , combinedId,'chat')
  const q = query(collectionRef , orderBy('createdAt' , 'asc'))
  const snapShot = await getDocs(q) ;
  const chats = [];
  snapShot.docs.map((docsnapshot) => {
    chats.push(docsnapshot.data());
  });
  
  return chats;
};

export const lastMessage = async (combinedId) =>{
  const collectionRef = collection(db ,'messages' , combinedId,'chat')
  const q = query(collectionRef , orderBy('createdAt' , 'desc') , limit(1))
  const snapShot = await getDocs(q) ;
  const lastchat = [];
  snapShot.docs.map((docsnapshot) => {
    lastchat.push(docsnapshot.data());
  });
  
  return lastchat;
  
}

// export const createlatestchat = async (sender, reciver, text, combinedId ) => {
//   try {
//     await setDoc(doc(db, "lastmsgs", combinedId, ), {
//       text,
//       from: sender,
//       to: reciver,
      
//       createdAt: Timestamp.fromDate(new Date()),
//       isRead:false
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getLatestChat = async (combinedId) =>{
//   const lastchat =[]
//    await onSnapshot(doc(db,'lastmsgs' , combinedId) ,(doc)=>{
//       lastchat.push(doc.data());
//   })
//   return lastchat;
 
// }



// const firebaseConfig = {
//   apiKey: "AIzaSyD9SPBqHvqNSzDBxKlZjB5hprIs037rWIA",
//   authDomain: "chat-app-b194a.firebaseapp.com",
//   projectId: "chat-app-b194a",
//   storageBucket: "chat-app-b194a.appspot.com",
//   messagingSenderId: "1037494514756",
//   appId: "1:1037494514756:web:5909c2924878f6e1b47811",
//   measurementId: "G-39SBT2C2P3",
// };
