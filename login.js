

/*
function hidelog() {
    var log_form= document.querySelector('.log_form');
  log_form.style.display = 'none';

  var reg_form= document.querySelector('.reg_form');
  reg_form.style.display = 'block';


  }

  function hidereg() {
    var log_form= document.querySelector('.log_form');
  log_form.style.display = 'block';

  var reg_form= document.querySelector('.reg_form');
  reg_form.style.display = 'none';


  }

  var buttonreg = document.querySelector('#hide-button');
  buttonreg.addEventListener('click', hidereg);
  var buttonlog = document.querySelector('#hide-button');
button.addEventListener('click', hidelog);
*/
/*
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8huoUJahSSgfeVrduetfga8VcAn3ohUA",
  authDomain: "rent-car-b7bab.firebaseapp.com",
  projectId: "rent-car-b7bab",
  storageBucket: "rent-car-b7bab.appspot.com",
  messagingSenderId: "307208189325",
  appId: "1:307208189325:web:49734a018255314d7039c4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);*/

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, TwitterAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const username = document.getElementById("username").value;

const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const singupemailIn = document.getElementById("email-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const forgetpass = document.getElementById('forgetpass');

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;









createacctbtn.addEventListener("click", function () {
  var isVerified = true;
  var rank = 1;
  var fullName = document.getElementById("fullName").value;
  var username = document.getElementById("username").value;

  signupEmail = singupemailIn.value;
  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.")
    isVerified = false;
  }

  if (signupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...


        // Create User data
        var user_data = {
          email: signupEmail,
          full_name: fullName,
          password: signupPassword,
          username: username,
          last_login: Date(),
          rank: rank
        }
        console.log(user.uid + " --- " + auth.currentUser.uid)

        // Push to Firebase Database
        set(ref(database, 'users/' + auth.currentUser.uid), user_data)
        window.alert("Success! Account created.  " + fullName);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        //window.alert("Error occurred. Try again.");
        alert(errorMessage)
      });
  }
});

















var passcounter = 0;

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      // ...

      // Declare user variable
      console.log(user.uid)


      update(ref(database, 'users/' + user.uid), { last_login: Date() });
      onValue(ref(database, '/users/' + user.uid), (snapshot) => {
        var rank1 = snapshot.val().rank;
        console.log(rank1)
        window.localStorage.setItem("userid",user.uid);
        if (rank1 == 1)
          location.href = "index_beta.html";
        if (rank1 == 0)
          location.href = "admin_panel.html"
        // ...
      });


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert('Wrong Password, please try again!');
      passcounter++;
      console.log(passcounter)
      if (passcounter >= 3)
        showforgetpass();


    });
});








function showforgetpass() {
  document.getElementById('forgetpass').style.display = "block";
}














signupButton.addEventListener("click", function () {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});




forgetpass.addEventListener("click", function () {


  var email = document.getElementById('email').value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('link sended to reset your password');
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

const providerTwitter = new TwitterAuthProvider();
const providerGoogle = new GoogleAuthProvider();



google_login.addEventListener("click", function () {


  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user.displayName + ' -- ' + token + ' -- ' + credential)
      alert(user.displayName + ' welcome back. you are redirecting');
      update(ref(database, 'users/' + user.uid), { 
        last_login: Date(), 
        rank: "1",
        full_name:user.displayName,
        email:user.email,
        username: user.uid
      });
      onValue(ref(database, '/users/' + user.uid), (snapshot) => {
        var rank1 = snapshot.val().rank;
        console.log(rank1)
        if (rank1 == 1)
          location.href = "index_beta.html";
        if (rank1 == 0)
          location.href = "admin_panel.html"
        // ...
      });
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(credential + ' -- ' + errorMessage + ' -- ' + email)
    });
});






forgetpass.addEventListener('click', (e) => {

  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent successfully');

    })
    .catch(error => {
      console.error(error);
    })
})