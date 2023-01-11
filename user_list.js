import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var app = initializeApp(firebaseConfig);

var database = getDatabase(app);
 
 // read data

 window.onload = resfreshtable();



 function resfreshtable() {
     $('#dataTblUser td').remove();
     var rowNum = 0;
     const dbRef = ref(database, 'users/');

     onValue(dbRef, (snapshot) => {
         snapshot.forEach((childSnapshot) => {
             var childKey = childSnapshot.key;
             const childData = childSnapshot.val();
             // ...
             rowNum += 1;

             var removebtnUser = "<input data-key='" + childKey + "'  class='btn btn-danger btn-block removeBtn' value='detete' id='btnDelete' type='button'></input>";
             //var removeBtn_elem = "<td><button data-key='" + item.key + "' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";
             var rankSelector = " <select style='width: 90px; text-align: center;' data-keyuser='" + childKey + "' data-userdata='"+childData.rank+"' id='rankSelector"+rowNum+"' class='btn btn-danger btn-block rankSelector' > <option value='1' >USER</option> <option value='0'>ADMIN</option>   </select>"
             
          
             
             
             var row =
             "<tr><td>" + rowNum +
             "</td><td>" + childData.username +
             "</td><td>" + childData.email +
             "</td><td>" + childData.last_login +
             "</td><td>" + childData.rank +
             "</td><td>" + childData.full_name +
             "</td><td>" + rankSelector +
             "</td><td>" + removebtnUser +
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
    var $userrank =   $(this).data("userdata");
    
    if ($userrank ==0) 
    update(ref(database, 'users/' + $keyuser), {rank: "1" });
    if ($userrank ==1) 
    update(ref(database, 'users/' + $keyuser), {rank: "0" });


    
    alert('User Changed ' + $keyuser);
    //
    resfreshtable();
    });

    







 $("body").on("click", ".removebtnUser", function () {
     var $key = $(this).data("key");
     //alert("Are you sure you want to delete the tool?");
     
     var answer = window.confirm("Are you sure you want to delete the tool?" + $key);
     if (answer) {
         //database.ref('/Cars/' + $key).remove();
         remove(ref(database, 'users/' + $key));
         alert("removed");
     }
     resfreshtable();




 });

