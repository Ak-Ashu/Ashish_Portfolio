function openGallery(id) {
  document.getElementById(id).classList.add("active");
  document.body.style.overflow = "hidden"; // disable background scroll
}

function closeGallery(id) {
  document.getElementById(id).classList.remove("active");
  document.body.style.overflow = "auto";
}

