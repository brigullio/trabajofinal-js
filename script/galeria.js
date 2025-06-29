const images = document.querySelectorAll(".image");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

for (let imageSelected of images) {
   imageSelected.addEventListener("click", function(){
    const isActive = imageSelected.classList.contains("active");

    if (!isActive){
        resetFocus();
        imageSelected.classList.add("active");
    } else{
     //si ya esta activa
     const bgImage = window.getComputedStyle(imageSelected).backgroundImage;
     const url = bgImage.slice(5, -2); //se toma la url limpia
     lightboxImg.src = url;
     lightbox.classList.remove("hidden");
    }
   })
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }
});

function resetFocus(){
    images.forEach(i => i.classList.remove("active"))
}




