//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  errorDiv.textContent = "";
  output.innerHTML = "";
  loadingDiv.style.display = "block";

  Promise.all(images.map(imgObj => loadImage(imgObj.url)))
    .then(loadedImages => {
      loadingDiv.style.display = "none";
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    });
}

btn.addEventListener("click", downloadImages);
