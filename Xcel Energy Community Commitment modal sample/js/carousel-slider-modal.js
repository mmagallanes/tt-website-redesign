var modal = document.getElementById('carouselModal');
var modalImage = document.getElementById("slide");
var caption = document.getElementById("caption");
var navBar = document.getElementById("navBarContent");
var logo = document.getElementById("logoButton");
var carouselIndicators = document.getElementById("indicators");
var header = document.getElementById("header");

document.getElementById('image').addEventListener("click", openModal);
document.getElementById('image2').addEventListener("click", openModal);
document.getElementById('image3').addEventListener("click", openModal);
document.getElementById('image4').addEventListener("click", openModal);
document.getElementById('image5').addEventListener("click", openModal);
document.getElementById('image6').addEventListener("click", openModal);
document.getElementsByClassName("close")[0].addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
  carouselIndicators.style.display = "none";
  logo.style.display = "none";
  navBar.style.display = "none";
  header.style.display = "none";
  modalImage.src = this.src;
  caption.innerHTML = this.alt;
}

function closeModal() {
  modal.style.display = "none";
  carouselIndicators.style.display = "block";
  logo.style.display = "block";
  navBar.style.display = "block";
  header.style.display = "block";
}