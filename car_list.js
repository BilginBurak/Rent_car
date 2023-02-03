// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// read data

window.onload = resfreshtable();



function resfreshtable() {
    $('#dataTbl td').remove();
    var rowNum2 = 0;
    const dbRef = ref(database, 'Cars/');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            // ...
            rowNum2 += 1;

            var removebtn = "<input style='text-align: center; font-size:12px' data-keyc='" + childSnapshot.key + "'  class='btn btn-danger btn-block removeBtn' value='detete' id='btnDelete' type='button'></input>";
            //var removeBtn_elem = "<td><button data-key='" + item.key + "' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";
            var activationselect = "<select style='width: 100px; text-align: center; font-size:12px' data-carsidsi='" + childKey + "' data-activation='" + childData.active + "' id='activationselect" + rowNum2 + "' class='btn btn-danger btn-block activationselect' > <option value='true' >Active</option> <option value='false'>Not Active</option>   </select>"


            var row =
                "<tr><td>" + rowNum2 +
                "</td><td>" + childData.ID_car +
                "</td><td>" + childData.carname +
                "</td><td>" + childData.category +
                "</td><td>" + childData.fuelType +
                "</td><td>" + childData.year +
                "</td><td>" + childData.price +
                "</td><td>" + activationselect +
                "</td><td>" + removebtn +
                "</td></tr>"

                $(row).appendTo('#dataTbl');
                document.getElementById('activationselect' + rowNum2).value = childData.active;

        });
    }, {
        onlyOnce: true
    });


};



$("body").on("input", ".activationselect", function () {
    var $carsID = $(this).data("carsidsi");

    var $activation = $(this).data("activation");

    if ($activation == false)
        update(ref(database, 'Cars/' + $carsID + '/'), { active: true });
    if ($activation == true)
        update(ref(database, 'Cars/' + $carsID + '/'), { active: false });



    console.log('CAR Changed: ' + $carsID);
    //
    resfreshtable();
});





$("body").on("click", ".removeBtn", function () {
    var $keyc = $(this).data("keyc");
    //alert("Are you sure you want to delete the tool?");

    var answer = window.confirm("Are you sure you want to delete the tool?" + $keyc);
    if (answer) {
        //database.ref('/Cars/' + $key).remove();
        remove(ref(database, 'Cars/' + $keyc));
        alert("removed");
    }
    resfreshtable();




});





