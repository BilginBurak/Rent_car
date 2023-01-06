// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase


var firebaseCarId;


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


btnAdd.addEventListener('click', (e) => {
    var ID_car = document.getElementById('ID_car').value;
    var carname = document.getElementById('carname').value;
    var year = document.getElementById('year').value;
    var price = document.getElementById('price').value;
    var category = document.getElementById('category').value;
    var fuelType = document.getElementById('fuelType').value;


    const dbRef = ref(database);
    get(child(dbRef, 'Counters/carIdCounter/')).then((snapshot) => {
        firebaseCarId = Number(snapshot.val());
        firebaseCarId += 1;

        console.log(ID_car);
        console.log(firebaseCarId);

        update(ref(database, '/Counters'), { carIdCounter: firebaseCarId });






        set(ref(database, 'Cars/' + firebaseCarId.toString()), {
            ID_car: firebaseCarId,
            carname: carname,
            year: year,
            price: price,
            category: category,
            fuelType: fuelType

        });

    });
    alert('saved');
});









// get data
btnGet.addEventListener('click', (e) => {

    var ID_car = document.getElementById('ID_car').value;

    const starCountRef = ref(database, 'Cars/' + ID_car);
    onValue(starCountRef, (snapshot) => {
        var data = snapshot.val(); // data = all data on firebse     
       

        document.getElementById('ID_car').value = ID_car;
        document.getElementById('carname').value = data.carname;
        document.getElementById('year').value = data.year;
        document.getElementById('price').value = data.price;
        document.getElementById('category').value = data.category;
        document.getElementById('fuelType').value = data.fuelType;
          



    });

    if (document.getElementById('carname').value =="" && document.getElementById('ID_car').value =="") alert("id giriniz");
    else alert("Verilriniz getirildi");
   




});











// update data
btnUpdate.addEventListener('click', (e) => {
    var ID_car = document.getElementById('ID_car').value;
    var carname = document.getElementById('carname').value;
    var year = document.getElementById('year').value;
    var price = document.getElementById('price').value;
    var category = document.getElementById('category').value;
    var fuelType = document.getElementById('fuelType').value;

    update(ref(database, 'Cars/' + ID_car), {
        ID_car: ID_car,
        carname: carname,
        year: year,
        price: price,
        category: category,
        fuelType: fuelType


    })
    alert('updated');
});

/// remove data
btnDelete.addEventListener('click', (e) => {
    var id = document.getElementById('ID_car').value;

    remove(ref(database, 'Cars/' + id));
    alert('asdsddffgas');
});





btnClean.addEventListener('click', (e) => {
    document.getElementById('ID_car').value = "";
    document.getElementById('carname').value = "";
    document.getElementById('year').value = "";
    document.getElementById('price').value = "";
    document.getElementById('category').value = "none";
    document.getElementById('fuelType').value = "none";




    let q = document.getElementById('mainform');
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    var i = (Math.random() * 255).toString(16);
    var l = (Math.random() * 255).toString(16);
    var m = (Math.random() * 255).toString(16);
    //document.getElementById('mainform').style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    //        document.getElementById('btnDelete').style.backgroundColor =  '#' + i + '' + ''+l+ ''+m; 
    document.getElementById('btnDelete').style.backgroundColor = '#' + i + '' + l + '' + m;


});




