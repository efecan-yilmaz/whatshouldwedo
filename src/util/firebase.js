import Firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebase = Firebase.initializeApp(firebaseConfig);

export default firebase;

// export default class Firebase {
//     initialize() {
//         var firebaseConfig = {
//             apiKey: "AIzaSyCyc4vf_UfdGa5_TmurR7o0sxqySOOzBZg",
//             authDomain: "whatshouldwedo-544ad.firebaseapp.com",
//             projectId: "whatshouldwedo-544ad",
//             storageBucket: "whatshouldwedo-544ad.appspot.com",
//             messagingSenderId: "495566516140",
//             appId: "1:495566516140:web:acbfe802e6bf2ba095d409"
//         };

//         firebase.initializeApp(firebaseConfig);
//         console.log('initialized');
//     } 
// }