// Slider Öğelerini Al
var slider = document.querySelector('.slider');
var slides = slider.querySelectorAll('.slide');

// Geçerli Öğeyi İndeks ile Belirt
var currentSlide = 0;

// Öğeleri Gizle
function hideSlides() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
}

// Bir Öğeyi Göster
function showSlide(index) {
  hideSlides();
  slides[index].style.display = 'block';
}

// Öğeleri Otomatik Geçiş Yaparak Göster
function autoSlide() {
  hideSlides();
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
  setTimeout(autoSlide, 2000); // 5 saniyede bir geçiş yap
}

window.onload = function() {
    autoSlide();
  };


  function logout(){
    if (confirm('sen ağlıyoon??'))
    window.location.replace("index.html")
  }

