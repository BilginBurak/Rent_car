var gpaValue = document.getElementById("gpa-range");


function getData() {
  
    var x = $("form").serializeArray();

    swal({
        title: "Randevu başarıyla kaydedildi.",
        text: "Ad:\t" + x[1].value + "\nSoyad:\t" + x[3].value,
        icon: "success",
    });
}

function updateGPA(gpa) {
    gpaValue.textContent = gpa;
}

function gonder(){
    alert("Randevunuz Başarıyla Kaydedildi");
}