import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
window.onload = getCars();
//Araba Listeleme

function getCars() {

   
    const dbRef = ref(database, 'Cars/');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            // ...

            var row2= "<div class='carsproducts' id='carsproducts'><div class='carnameDiv'> <h2 ><strong class='carname' id='carname'>"
            + childData.carname + "</strong></h2><div class='categoryheader'><h4>"
            +childData.category+"</h4> </div> </div><div class='carimagediv'><img src='"
            +childData.CarsLinks+"' class='thumb' alt='' id='Carimage'></div> <div class='pricetag'><h3><strong>$"
            +childData.price+"</strong>/Day</h3></div>"
            + "<div  class='carProperties'> "
            +"<div class='carbottomdetail'><p>Capacity</p> <strong>"
            +childData.capacity+"</strong></div>"
            +"<div class='carbottomdetail'><p>Fuel</p> <strong>"
            +childData.fuelType+"</strong></div>"
            +"<div class='carbottomdetail'><p>Year</p> <strong>"
            +childData.year+"</strong></div>"
            +"<div class='carbottomdetail'><p>Gear</p> <strong>"
            +childData.gearType+"</strong></div> </div>"
            +"<button class='rentbtn' data-carid='" + childKey + "'>Rent This Car</button></div></div> ";


            $(row2).appendTo('#AllProducts');

        });
    }, {
        onlyOnce: true
    });

    var getJSON = firebase.functions().httpsCallable('getJSON');
    getJSON().then(function(result) {
        console.log(JSON.stringify(result.data));
    }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log(details)
        console.log(message)
        // ...
    });

}





$("body").on("click", ".rentbtn", function () {
    
    var $keyCar = $(this).data("carid");
    window.localStorage.setItem("carid",$keyCar);
    //alert( window.localStorage.getItem("carid"));
    //alert("Are you sure you want to delete the tool?");
    
console.log($keyCar)
location.href= 'rent_car.html';

});
