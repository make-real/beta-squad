import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBlMjJ4vdvG_hR_FR_oy-EsxjLXJpOCze4",
//   authDomain: "space-clone-e63a1.firebaseapp.com",
//   projectId: "space-clone-e63a1",
//   storageBucket: "space-clone-e63a1.appspot.com",
//   messagingSenderId: "843403980713",
//   appId: "1:843403980713:web:caf24779945778062b5eb8",
//   measurementId: "G-L6DX0B68GP",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBDFfC7GQimmCYz3uGBVowLAD08eDoqD-U",
  authDomain: "beta-squad-71f85.firebaseapp.com",
  projectId: "beta-squad-71f85",
  storageBucket: "beta-squad-71f85.appspot.com",
  messagingSenderId: "268368468319",
  appId: "1:268368468319:web:83c9aa7be0b0852fc63eea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;

/* //* working
const firebaseConfig = {
  apiKey: "AIzaSyBlMjJ4vdvG_hR_FR_oy-EsxjLXJpOCze4",
  authDomain: "space-clone-e63a1.firebaseapp.com",
  projectId: "space-clone-e63a1",
  storageBucket: "space-clone-e63a1.appspot.com",
  messagingSenderId: "843403980713",
  appId: "1:843403980713:web:caf24779945778062b5eb8",
  measurementId: "G-L6DX0B68GP",
};
*/

/* another from Mahbub vai er firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3_wW-eaqu5NA8Ll8XQn8EFQv9uQjHaRo",
  authDomain: "space-clone-feea3.firebaseapp.com",
  projectId: "space-clone-feea3",
  storageBucket: "space-clone-feea3.appspot.com",
  messagingSenderId: "245385095023",
  appId: "1:245385095023:web:a7df2a74a5deeb1778aa9a"
};
*/
