



var Files = [];
var FileReaders = [];
var imageLinkArray = [];


const imgDiv = document.getElementById("imageDiv");
const selBtn = document.getElementById("selimgsbtn");

/*
        function openFileDialog() {

            let inp = document.createElement('input');
            inp.type = 'file'; 
            inp.multiple = 'multiple'; 
            inp.onchange = (e) => {
                assingImgsToFilesArray(e.target.files);
                CreateImgTags();
            }
            inp.click();
        };

*/


function openFileDialog() {

    let inp = document.createElement('input');
    inp.type = 'file';
    inp.multiple = 'multiple';
    inp.onchange = (e) => {
        assingImgsToFilesArray(e.target.files);
        createImgTags();        

    }
    inp.click();
};






        function assingImgsToFilesArray(thefiles){
            let num = Files.length + thefiles.length;
            let looplim = (num <= 10) ? thefiles.length : (10-Files.length);

            for (let i = 0; i < looplim; i++){
                Files.push(thefiles[i]);
            }

            if (num>10) alert("maximum 10 images are allowed!")
        }


function createImgTags() {
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

        fileReaders[i].readAsDataURL(Files[i]);
    }
}


//selBtn.addEventListener('click', openFileDialog);
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

    }
});
