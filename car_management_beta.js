// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, child, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase


var firebaseCarId;


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);





var Files = [];
var FileReaders = [];
var ImageLinksArray = [];


const imgDiv = document.getElementById("imageDiv");
const selBtn = document.getElementById("selimgsbtn");
const btnAdd = document.getElementById("btnAdd");


function assingImgsToFilesArray(thefiles) {
    let num = Files.length + thefiles.length;
    let looplim = (num <= 10) ? thefiles.length : (10 - Files.length);

    for (let i = 0; i < looplim; i++) {
        Files.push(thefiles[i]);
    }

    if (num > 10) alert("maximum 10 images are allowed!")
}


selBtn.addEventListener('click', (e) => {

    let inp = document.createElement('input');
    inp.type = 'file';
    inp.multiple = 'multiple';
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
        let lab = document.getElementById('label');
        lab.innerHTML= 'clear images';
        lab.style = 'cursor: pointer; display:block; color:navy;';
        lab.addEventListener('click', clearImages);
        imgDiv.append(lab);

    }
});


function clearImages(){
    Files =[];
    ImageLinksArray=[];
    imgDiv.innerHTML ="";
    imgDiv.classList.remove('imagesDivStyle')
}






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
            fuelType: fuelType,
            linksOfImages: ImageLinksArray

        });

    });
    alert('saved');
    restorebuttonback();
});





function restorebuttonback() {
    selBtn.disabled = false;
    btnAdd.disabled = false;
}
function UploadAllImages() {
    selBtn.disabled = true;
    btnAdd.disabled = true;  
    ImageLinksArray=[];
    for (let i = 0; i < Files.length; i++) { uploadAnImage(Files[i], i); }

}

function IsAllImagesUploaded(){
    return ImageLinksArray.length = Files.length;
}

function getShortTitle(){
    let shortname = name.value.substring(0,50);
    return shortname.replace(/[^a-zA-Z0-9]/g,"")
}

function getImgUploadProgress(){
    return 'Images Uploaded ' + ImageLinksArray.length + ' of ' + Files.length;
}


function uploadAnImage(imgToUpluad, imgNo) {
    const metadata = {
        contentType: imgToUpluad.type
    };
    const storage = getStorage();
    const ImageAddress = "CarsImages/" + getShortTitle() + "img#" + (imgNo + 1);
    const storageRef = sRef(storage, ImageAddress);
    const uploadTask = uploadBytesResumable(storageRef, imgToUpluad, metadata);

    uploadTask.on('state-changed', (snapshot) => {
        proglab.innerHTML = getImgUploadProgress();
    }),
        (error) => {
            alert("error: image upload progress get failed!");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                ImageLinksArray.push(downloadURL);
                if (IsAllImagesUploaded) {
                    proglab.innerHTML = "all images uploaded";
                    UploadProduct();
                }
            });
        }
}





















































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

    if (document.getElementById('carname').value == "" && document.getElementById('ID_car').value == "") alert("id giriniz");
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




