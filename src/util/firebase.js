import firebase from 'firebase/app';

export default class Firebase {
    initialize() {
        var firebaseConfig = {
            apiKey: "AIzaSyCyc4vf_UfdGa5_TmurR7o0sxqySOOzBZg",
            authDomain: "whatshouldwedo-544ad.firebaseapp.com",
            projectId: "whatshouldwedo-544ad",
            storageBucket: "whatshouldwedo-544ad.appspot.com",
            messagingSenderId: "495566516140",
            appId: "1:495566516140:web:acbfe802e6bf2ba095d409"
        };

        firebase.initializeApp(firebaseConfig);
        console.log('initialized');
    } 
}