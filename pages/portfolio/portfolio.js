document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadButton");
    const uploadInput = document.getElementById("uploadInput");
    const imageTitleInput = document.getElementById("imageTitle");
    const gallery = document.getElementById("gallery");
    const clearGalleryButton = document.getElementById("clearGallery");

    // завантаження галереї з localStorage
    function loadGallery() {
        gallery.innerHTML = "";
        const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
        savedImages.forEach(item => {
            addImageToGallery(item.src, item.title);
        });
    }

    
    function addImageToGallery(src, title) {
        let newImage = document.createElement("div");
        newImage.classList.add("gallery-item");
        newImage.innerHTML = `<img src="${src}" alt="${title}"><p>${title}</p>`;
        gallery.insertBefore(newImage, gallery.firstChild);
    }

    // Обробка завантаження зображення
    uploadButton.addEventListener("click", function () {
        let title = imageTitleInput.value.trim();
        if (!title) {
            alert("Будь ласка, введіть назву ілюстрації!");
            return;
        }

        if (uploadInput.files && uploadInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                const imageSrc = e.target.result;

                addImageToGallery(imageSrc, title);

                // Збереження у localStorage
                const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
                savedImages.push({ src: imageSrc, title: title });
                localStorage.setItem("portfolioImages", JSON.stringify(savedImages));

                
                imageTitleInput.value = "";
                uploadInput.value = "";

                alert("Ілюстрація успішно додана до портфоліо!");
            };
            reader.readAsDataURL(uploadInput.files[0]);
        }
    });

    
    clearGalleryButton.addEventListener("click", function () {
        if (confirm("Ви впевнені, що хочете очистити всю галерею?")) {
            localStorage.removeItem("portfolioImages");
            gallery.innerHTML = "";
        }
    });

    // Завантаження галереї при відкритті сторінки
    loadGallery();
});
