const fileInput = document.getElementById('fileInput');
const image = document.getElementById('image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saturationRange = document.getElementById('saturationRange');
const saturationValue = document.getElementById('saturationValue');
const brightnessRange = document.getElementById('brightnessRange');
const brightnessValue = document.getElementById('brightnessValue');
let selectedFile;

fileInput.addEventListener('change', function(event) {
    selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = () => {
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
        };
    };

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
});

saturationRange.addEventListener('input', function() {
    const value = saturationRange.value;
    saturationValue.textContent = `${value}%`;
    updateImageFilter();
});

brightnessRange.addEventListener('input', function() {
    const value = brightnessRange.value;
    brightnessValue.textContent = `${value}%`;
    updateImageFilter();
});

function updateImageFilter() {
    const saturation = saturationRange.value;
    const brightness = brightnessRange.value;
    image.style.filter = `saturate(${saturation}%) brightness(${brightness}%)`;
}

function applyGrayscale() {
    image.style.filter += ' grayscale(100%)';
}

function resetFilters() {
    saturationRange.value = 100;
    brightnessRange.value = 100;
    saturationValue.textContent = '100%';
    brightnessValue.textContent = '100%';
    updateImageFilter();  
}

function downloadImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = getComputedStyle(image).filter;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/jpg');     //Download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'filtered-image.jpg';
    link.click();
}