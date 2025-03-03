document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadButton");
    const uploadInput = document.getElementById("uploadInput");
    const imageTitleInput = document.getElementById("imageTitle");
    const imageAuthorInput = document.getElementById("imageAuthor");
    const imageYearInput = document.getElementById("imageYear");
    const imageDescriptionInput = document.getElementById("imageDescription");
    const gallery = document.getElementById("gallery");
    const clearGalleryButton = document.getElementById("clearGallery");

    function loadGallery() {
        gallery.innerHTML = "";
        const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
        savedImages.forEach(item => {
            addImageToGallery(item.src, item.title, item.author, item.year, item.description);
        });
    }

    function addImageToGallery(src, title, author, year, description) {
        let newImage = document.createElement("div");
        newImage.classList.add("gallery-item");
        newImage.innerHTML = `
            <img src="${src}" alt="${title}">
            <h3>${title}</h3>
            <p><b>Автор:</b> ${author || "Невідомий"}</p>
            <p><b>Рік:</b> ${year || "Невідомий"}</p>
            <button class="view-description">Переглянути опис</button>
            <div class="description hidden">
                <p>${description || "Опис відсутній"}</p>
            </div>
        `;
        gallery.insertBefore(newImage, gallery.firstChild);

        // Додамо функціонал для перегляду опису
        newImage.querySelector('.view-description').addEventListener('click', () => {
            newImage.querySelector('.description').classList.toggle('hidden');
        });
    }

    uploadButton.addEventListener("click", function () {
        let title = imageTitleInput.value.trim();
        let author = imageAuthorInput.value.trim();
        let year = imageYearInput.value.trim();
        let description = imageDescriptionInput.value.trim();

        if (!title) {
            alert("Будь ласка, введіть назву ілюстрації!");
            return;
        }

        // Перевірка року
        if (year && (new Date(year).getFullYear() > 2025)) {
            alert("Будь ласка, введіть коректний рік (не більше 2025).");
            return;
        }

        if (uploadInput.files && uploadInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                const imageSrc = e.target.result;

                addImageToGallery(imageSrc, title, author, year, description);

                const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
                savedImages.push({ src: imageSrc, title, author, year, description });
                localStorage.setItem("portfolioImages", JSON.stringify(savedImages));

                imageTitleInput.value = "";
                imageAuthorInput.value = "";
                imageYearInput.value = "";
                imageDescriptionInput.value = "";
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

    loadGallery();
});
