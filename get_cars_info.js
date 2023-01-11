import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

/*
var firebaseConfig = {
    apiKey: "AIzaSyD8huoUJahSSgfeVrduetfga8VcAn3ohUA",
authDomain: "rent-car-b7bab.firebaseapp.com",
projectId: "rent-car-b7bab",
storageBucket: "rent-car-b7bab.appspot.com",
messagingSenderId: "307208189325",
appId: "1:307208189325:web:49734a018255314d7039c4"
};*/

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
           


            /*
            var row = "<div class='carsproducts' id='carsproducts'><div class='carnameDiv'> <h3 ><span class='carname' id='carname'>"
                + childData.carname + "</span></h3></div> <div><img src='"
                +childData.CarsLinks+"' class='thumb' alt='' id='Carimage'></div>" 
                + "<div><ul class='productsUl'><li>Koltuk Sayisi: <span id='seatSpn'>"
                +childData.capacity+"</span></li> <li>Fuel Type: <span id='fuelSpn'>"
                +childData.fuelType+"</span></li>  <li>Category: <span id='categorySpn'>"
                +childData.category+"</span> </li>  <li>Year: <span id='yearSpn'>"
                +childData.year+"</span></li>  <li>Ehliyet tipi: <span id='typeSpn'>"
                +childData.licenseType+"</span> </li></ul></div>  <div><h4>For a Day:<span id='price'>"
                +childData.price+"$</span></h4></div> <div>";

*/

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
            +"<button class='rentbtn'>Rent This Car</button></div></div> ";




            $(row2).appendTo('#AllProducts');

        });
    }, {
        onlyOnce: true
    });
}

