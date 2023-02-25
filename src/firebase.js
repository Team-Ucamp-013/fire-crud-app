import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5Wmpc4r-nmuqaFTizU3ah8XnD14gOdOQ",
  authDomain: "crud-example-react.firebaseapp.com",
  projectId: "crud-example-react",
  storageBucket: "crud-example-react.appspot.com",
  messagingSenderId: "904910679726",
  appId: "1:904910679726:web:22d7f66a64417b8fdec73f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export { db }