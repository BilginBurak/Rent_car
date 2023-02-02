// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyD8huoUJahSSgfeVrduetfga8VcAn3ohUA",
    authDomain: "rent-car-b7bab.firebaseapp.com",
    databaseURL: "https://rent-car-b7bab-default-rtdb.firebaseio.com",
    projectId: "rent-car-b7bab",
    storageBucket: "rent-car-b7bab.appspot.com",
    messagingSenderId: "307208189325",
    appId: "1:307208189325:web:49734a018255314d7039c4",
    measurementId: "G-5HKTNKYZ9R"
};


var firebaseCarId;


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);





var Files = [];
var FileReaders = [];
var ImageLinksArray = [];


const imgDiv = document.getElementById("imageDiv");
const selBtn = document.getElementById("selimgsbtn");
const selBtnUpdate = document.getElementById("selimgsbtnupdate");

const btnAdd = document.getElementById("btnAdd");

const proglab = document.getElementById("proglab");


function assingImgsToFilesArray(thefiles) {
    let num = Files.length + thefiles.length;
    let looplim = (num <= 10) ? thefiles.length : (10 - Files.length);

    for (let i = 0; i < looplim; i++) {
        Files.push(thefiles[i]);
    }

    if (num > 10) alert("maximum 10 images are allowed!")
}


selBtnUpdate.addEventListener('click', (e) => {

    let inp = document.createElement('input');
    inp.type = 'file';
    inp.multiple = 'multiple';
    inp.id = 'imgmultiselector'
    inp.click();
    inp.onchange = (e) => {

        assingImgsToFilesArray(e.target.files);
        UpdateimageDiv.innerHTML = '';
        UpdateimageDiv.classList.add('imagesDivStyle');
        for (let i = 0; i < Files.length; i++) {
            FileReaders[i] = new FileReader();

            FileReaders[i].onload = function () {
                var img = document.createElement('img');
                img.id = 'imgNo' + i;
                img.classList.add('imgs');
                img.src = FileReaders[i].result;
                UpdateimageDiv.append(img);
            }

            FileReaders[i].readAsDataURL(Files[i]);
        }


    }

});
selBtn.addEventListener('click', (e) => {

    let inp = document.createElement('input');
    inp.type = 'file';
    inp.multiple = 'multiple';
    inp.id = 'imgmultiselector'
    inp.click();
    inp.onchange = (e) => {

        assingImgsToFilesArray(e.target.files);
        imgDiv.innerHTML = '';
        imgDiv.classList.add('imagesDivStyle');
        for (let i = 0; i < Files.length; i++) {
            FileReaders[i] = new FileReader();

            FileReaders[i].onload = function () {
                var img = document.createElement('img');
                img.id = 'imgNo' + i;
                img.classList.add('imgs');
                img.src = FileReaders[i].result;
                imgDiv.append(img);
            }

            FileReaders[i].readAsDataURL(Files[i]);
        }


    }

});





addCarbtnAdd.addEventListener('click', (e) => {
    //var ID_car = document.getElementById('ID_car').value;
    var carname = document.getElementById('addCarcarname').value;
    var year = document.getElementById('addCaryear').value;
    var price = document.getElementById('addCarprice').value;
    var category = document.getElementById('addCarcategory').value;
    var fuelType = document.getElementById('addCarfuelType').value;

    var licenseType = document.getElementById('addCarlicenseType').value;
    var capacity = document.getElementById('addCarcapacity').value;
    var gearType = document.getElementById('addCargearType').value;


    const dbRef = ref(database);


    get(child(dbRef, 'Counters/carIdCounter/')).then((snapshot) => {
        firebaseCarId = Number(snapshot.val());
        firebaseCarId += 1;


        for (let i = 0; i < Files.length; i++) {


            const metadata = { contentType: Files[i].type };
            const storage = getStorage();
            const ImageAddress = "CarsImages/" + "CarId:" + firebaseCarId.toString() + "--" + carname + "_img#" + (i + 1);
            const storageRef = sRef(storage, ImageAddress);


            uploadBytesResumable(storageRef, Files[i], metadata)
                .then((snapshot) => {
                    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                    console.log('File metadata:', snapshot.metadata);
                    // Let's get a download URL for the file.
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        set(ref(database, 'Cars/' + firebaseCarId.toString() + '/CarsLinks/' + i), downloadURL);

                    });
                }).catch((error) => {
                    console.error('Upload failed', error);
                    // ...
                }
                );
        };






        update(ref(database, '/Counters'), { carIdCounter: firebaseCarId });

        console.log(firebaseCarId);




        update(ref(database, 'Cars/' + firebaseCarId.toString()), {
            ID_car: firebaseCarId,
            carname: carname,
            year: year,
            price: price,
            category: category,
            fuelType: fuelType,
            licenseType: licenseType,
            capacity: capacity,
            gearType: gearType

        });


    });


    alert('saved');
});











































/*

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


*/






// get data
updateCarbtnGet.addEventListener('click', (e) => {

    var ID_car = document.getElementById('idCar').value;

    if (document.getElementById('updateCarcarname').value == "" && document.getElementById('idCar').value == "") alert("id giriniz");



    const starCountRef = ref(database, 'Cars/' + ID_car);
    onValue(starCountRef, (snapshot) => {
        var data = snapshot.val(); // data = all data on firebse     


        //document.getElementById('ID_carU').value = ID_carU;
        document.getElementById('updateCaryear').value = data.year;
        document.getElementById('updateCarcarname').value = data.carname;
        document.getElementById('updateCarprice').value = data.price;
        document.getElementById('updateCarcategory').value = data.category;
        document.getElementById('updateCarfuelType').value = data.fuelType;


        document.getElementById('updateCarlicenseType').value = data.licenseType;
        document.getElementById('updateCarcapacity').value = data.capacity;
        document.getElementById('updateCargearType').value = data.gearType;


        UpdateimageDiv.innerHTML = '';
        UpdateimageDiv.classList.add('imagesDivStyle');
        var img = document.createElement('img');
        img.classList.add('imgs');
        img.src = data.CarsLinks;
        UpdateimageDiv.append(img);




    });

    alert("Car' data fetched");






});











// update  car's data
updateCarbtnAdd.addEventListener('click', (e) => {
    var ID_car = document.getElementById("idCar").value;
    var carname = document.getElementById('updateCarcarname').value;
    var year = document.getElementById('updateCaryear').value;
    var price = document.getElementById('updateCarprice').value;
    var category = document.getElementById('updateCarcategory').value;
    var fuelType = document.getElementById('updateCarfuelType').value;

    var licenseType = document.getElementById('updateCarlicenseType').value;
    var capacity = document.getElementById('updateCarcapacity').value;
    var gearType = document.getElementById('updateCargearType').value;


    update(ref(database, 'Cars/' + ID_car), {
        ID_car: ID_car,
        carname: carname,
        year: year,
        price: price,
        category: category,
        fuelType: fuelType,
        licenseType: licenseType,
        capacity: capacity,
        gearType: gearType


    })
    alert('Car updated');
});

/// remove data
/*
btnDelete.addEventListener('click', (e) => {
    var id = document.getElementById('ID_car').value;

    remove(ref(database, 'Cars/' + id));
    alert('asdsddffgas');
});


*/


/*
btnClean.addEventListener('click', (e)=>{
    document.getElementById('carname').value = "";
    document.getElementById('year').value = "";
    document.getElementById('price').value = "";
    document.getElementById('category').value = "none";
    document.getElementById('fuelType').value = "none";

    document.getElementById('licenseType').value = "";
    document.getElementById('capacity').value = "";
    document.getElementById('gearType').value = "none";

    ImageLinksArray = [];
    imgDiv.innerHTML ="";
    imgDiv.classList.remove('imagesDivStyle');

    
})

*/


var addCarbtnClear = document.getElementById('addCarbtnClean');
addCarbtnClear.onclick = cleanitems;
function cleanitems() {
    //document.getElementById('addCarID_car').value = "";
    document.getElementById('addCarcarname').value = "";
    document.getElementById('addCaryear').value = "";
    document.getElementById('addCarprice').value = "";
    document.getElementById('addCarcategory').value = "none";
    document.getElementById('addCarfuelType').value = "none";

    document.getElementById('addCarlicenseType').value = "none";
    document.getElementById('addCarcapacity').value = "";
    document.getElementById('addCargearType').value = "none";

    ImageLinksArray = [];
    imgDiv.innerHTML = "";
    imgDiv.classList.remove('imagesDivStyle');


}






