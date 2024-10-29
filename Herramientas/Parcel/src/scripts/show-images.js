function showImages() {
  const button = document.querySelector(".button");
  button.classList.toggle("active");
  button.textContent = button.classList.contains("active")
    ? "Ocultar imágenes"
    : "Ver imágenes";

  const images = document.querySelector(".images");
  images.style.visibility = button.classList.contains("active")
    ? "visible"
    : "hidden";
}
