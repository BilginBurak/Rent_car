

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

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  username = document.getElementById('username').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(username) == false || validate_field(milk_before_cereal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      username : username,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now(),
      rank: 111
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    //window.location.href = "index.html";
    window.location.replace("index.html");
    alert('User Logged In!!')


  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}