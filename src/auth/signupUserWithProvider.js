import firebase, { db } from "./firebase";
import googleProvider from "./providers/google";

export default function signUpUser(type) {
  let provider = null;
  switch (type) {
    case "google":
      provider = googleProvider;
      break;
    default:
      break;
  }

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const { additionalUserInfo, user } = result;
      const { isNewUser } = additionalUserInfo;
      const { uid } = user;

      console.log("isNewUser", isNewUser);

      if (isNewUser) {
        // Add a new document in collection "cities"
        db.collection("users")
          .doc(uid)
          .set({
            uid,
          })
          .then(function () {
            return db.collection("todoLists").add({
              title: "Daily Todos",
              uid,
            });
          })
          .then(function () {
            console.log("Daily Todos Created");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.code, error.message);
    });
}
