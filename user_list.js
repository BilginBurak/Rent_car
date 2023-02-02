import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var app = initializeApp(firebaseConfig);

var database = getDatabase(app);
 
 // read data

 window.onload = refreshtableuser();


 function refreshtableuser() {
     $('#dataTblUser td').remove();
     var rowNum = 0;
     const dbRef = ref(database, 'users/');

     onValue(dbRef, (snapshot) => {
         snapshot.forEach((childSnapshot) => {
             var childKey = childSnapshot.key;
             const childData = childSnapshot.val();
             // ...
             rowNum += 1;

             var kullanicisil = "<input data-key='" + childKey + "'  class='btn btn-danger btn-block kullanicisil' value='Delete' id='btnDelete' type='button'></input>";
             //var removeBtn_elem = "<td><button data-key='" + item.key + "' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";
             var rankSelector = "<select style='width: 90px; text-align: center;' data-keyuser='" + childKey + "' data-userdata='" + childData.rank + "' id='rankSelector" + rowNum + "' class='btn btn-danger btn-block rankSelector' > <option value='1' >USER</option> <option value='0'>ADMIN</option>   </select>"




             var row =
                 "<tr><td>" + rowNum +
                 "</td><td>" + childData.username +
                 "</td><td>" + childData.full_name +
                 "</td><td>" + childData.email +
                 "</td><td>" + childData.last_login +
                 "</td><td>" + childData.carCount +
                 "</td><td>" + rankSelector +
                 "</td><td>" + kullanicisil +
                 "</td></tr>"

             $(row).appendTo('#dataTblUser');
             document.getElementById('rankSelector' + rowNum).value = childData.rank;

         });
     }, {
         onlyOnce: true
     });


 };


 $("body").on("input", ".rankSelector", function () {
     var $keyuser = $(this).data("keyuser");
     var $userrank = $(this).data("userdata");

     if ($userrank == 0)
         update(ref(database, 'users/' + $keyuser), { rank: "1" });
     if ($userrank == 1)
         update(ref(database, 'users/' + $keyuser), { rank: "0" });



     alert('User Changed ' + $keyuser);
     //
     refreshtableuser();
 });









 $("body").on("click", ".kullanicisil", function () {
     var $keyi = $(this).data("key");
     //alert("Are you sure you want to delete the tool?");

     var answer = window.confirm("Are you sure you want to delete the user?" + $keyi);
     if (answer) {
         //database.ref('users/' + $key).remove();
         remove(ref(database, 'users/' + $keyi));
         alert("removed");

     }
     refreshtableuser();



 });
