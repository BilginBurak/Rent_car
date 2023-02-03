import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);
//Araba Listeleme
var idCar = window.localStorage.getItem("carid");
var userid = window.localStorage.getItem("userid");



var carCount;

onValue(ref(database, 'users/' + userid + '/carCount'), (snapshot) => {
    carCount = snapshot.val();
    console.log(carCount);
})
//console.log(carCount);



window.onload = getCars();
function getCars() {



    //alert("Are you sure you want to delete the tool?");

    console.log(userid + " +++ " + idCar);




    const starCountRef = ref(database, 'Cars/' + idCar);


    onValue(starCountRef, (snapshot) => {
        const childKey = snapshot.key;
        const data = snapshot.val();

        var row = "<div> <h2>" + data.carname + "</h2> </div>"
            + "<div class=" + 'carCardImgDiv' + " >"
            + "<img class=" + 'carCardImage' + " src=" + data.CarsLinks + " alt='product image not found' > </div>"
            + "<div class='pricetag' ><h3>$<strong id='pricetag'>"
            + data.price + "</strong>/Day</h3></div>"
            + "<div  class='carProperties'> "
            + "<div class='carbottomdetail'><p>Capacity</p> <strong>"
            + data.capacity + "</strong></div>"
            + "<div class='carbottomdetail'><p>Fuel</p> <strong>"
            + data.fuelType + "</strong></div>"
            + "<div class='carbottomdetail'><p>Year</p> <strong>"
            + data.year + "</strong></div>"
            + "<div class='carbottomdetail'><p>Gear</p> <strong>"
            + data.gearType + "</strong></div> </div>";


        $(row).appendTo('#carCardMain');

    });

}


$(function () {
    $('input[name="dates"]').daterangepicker({
        opens: 'center'
    }, function (start, end, label) {
        var carPrice = document.getElementById('pricetag').textContent;
        console.log(carPrice)
        var days = new Date(end - start),
            totalDay = Math.floor(days / 1000 / 60 / 60 / 24);
        document.getElementById('daysRange').innerText = totalDay;
        if (carCount > 0) {

            var priceNotDiscount = totalDay * carPrice;
            document.getElementById('priceNotDiscount').innerText = priceNotDiscount;
            priceFinal = priceNotDiscount * 80 / 100;
        }
        else {
            priceFinal = totalDay * carPrice;
        }
        document.getElementById('priceFinal').innerText = priceFinal;
        console.log(totalDay);
    });
});


function cleanCar() {
    document.getElementById('carCardMain').innerHTML = "";
};




var priceFinal = document.getElementById('priceFinal').textContent;


clearForm.addEventListener('click', (e) => {


    console.log(firstName)
    console.log(lastName)
    console.log(phone)
    console.log(email)
    console.log(age)
    console.log(license)
    console.log(TCKN)
    console.log(adress)
    console.log(priceFinal)
    console.log(license)
    // if (firstName == "" || lastName == "" || phone == "" || adress == "" || email == "" || age == "" || license == "" || TCKN == "")
    if (lastName ==null)
    alert("Please control form element");
    
    else{
        
        if (priceFinal == null)
        alert("gün seç")

    }
    



})

btnRent.addEventListener('click', (e) => {

var firstName = document.getElementById('firstNametxt').value;
const lastName = document.getElementById('lastNametxt').value;
const phone = document.getElementById('formPhone').value;
var email = document.getElementById('formEmail').value;
const age = document.getElementById('formAge').value;
const license = document.getElementById('formLicense').value;
const TCKN = document.getElementById('TCKN').value;
const adress = document.getElementById('formAdress').value;





    if (firstName == "" || lastName == "" || phone == "" || adress == "" || email == "" || age == "" || license == "" || TCKN == "")
        alert("Please control form element");

    // idCar , userid
    console.log(userid);

    get(child(dbRef, 'Counters/rentIdCounter/')).then((snapshot) => {
        var rentcount = Number(snapshot.val());

        console.log(carCount);
        if (carCount > 2)
            alert("Maximum rental is 2, please deliver what you have and try later")

        else {

            get(child(dbRef, 'Cars/' + idCar)).then((snapshot) => {

                var isactive = snapshot.val().active;
                if (isactive == false)
                    alert("This car is not active please choose another")

                else {
                    set(ref(database, 'CarRentUser/' + rentcount), {
                        firstName: firstName,
                        CarId: idCar,
                        lastName: lastName,
                        price: priceFinal,
                        phone: phone,
                        email: email,
                        age: age,
                        license: license,
                        TCKN: TCKN,
                        adress: adress,
                        UserId: userid
                    })
                        .then(() => {
                            // Data saved successfully!
                            carCount += 1;
                            rentcount += 1;
                            update(ref(database, '/Counters'), { rentIdCounter: rentcount });
                            update(ref(database, 'users/' + userid), { carCount: carCount });
                            update(ref(database, 'Cars/' + idCar + '/'), { active: false });

                            console.log(carCount);
                            cleanCar();
                            getCars();
                            alert('okay');
                        })
                        .catch((error) => {
                            // The write failed...
                            alert(error.message)
                        });


                }






            })












        }




    });





});





