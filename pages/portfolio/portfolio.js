document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const uploadButton = document.getElementById("uploadButton");
    const uploadInput = document.getElementById("uploadInput");
    const imageTitleInput = document.getElementById("imageTitle");
    const imageAuthorInput = document.getElementById("imageAuthor");
    const imageYearInput = document.getElementById("imageYear");
    const imageDescriptionInput = document.getElementById("imageDescription");
    const clearGalleryButton = document.getElementById("clearGallery");

    function loadGallery() {
        const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
        gallery.innerHTML = ""; 
        savedImages.forEach((item, index) => {
            addImageToGallery(item, index);
        });
    }

    function addImageToGallery(item, index) {
        let newImage = document.createElement("div");
        newImage.classList.add("gallery-item");
        newImage.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><b>Автор:</b> ${item.author || "Невідомий"}</p>
            <p><b>Рік:</b> ${item.year || "Невідомий"}</p>
            <button class="view-description">Переглянути опис</button>
            <div class="description hidden">
                <p>${item.description || "Опис відсутній"}</p>
            </div>
            <button class="edit-image">Редагувати</button>
            <button class="delete-image">Видалити</button>
        `;

        gallery.appendChild(newImage);

        newImage.querySelector('.view-description').addEventListener('click', () => {
            newImage.querySelector('.description').classList.toggle('hidden');
        });

        newImage.querySelector('.edit-image').addEventListener('click', () => {
            editImage(index, item);
        });

        newImage.querySelector('.delete-image').addEventListener('click', () => {
            deleteImage(index);
        });
    }

    function editImage(index, item) {
        imageTitleInput.value = item.title;
        imageAuthorInput.value = item.author;
        imageYearInput.value = item.year;
        imageDescriptionInput.value = item.description;

        uploadButton.innerText = "Зберегти зміни";
        uploadButton.onclick = function () {
            const updatedTitle = imageTitleInput.value.trim();
            const updatedAuthor = imageAuthorInput.value.trim();
            const updatedYear = imageYearInput.value.trim();
            const updatedDescription = imageDescriptionInput.value.trim();

            if (!updatedTitle) {
                alert("Будь ласка, введіть назву ілюстрації!");
                return;
            }

            const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
            
            if (uploadInput.files && uploadInput.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    savedImages[index] = {
                        src: e.target.result,
                        title: updatedTitle,
                        author: updatedAuthor,
                        year: updatedYear,
                        description: updatedDescription
                    };
                    saveAndReload(savedImages);
                };
                reader.readAsDataURL(uploadInput.files[0]);
            } else {
                savedImages[index] = {
                    ...savedImages[index],
                    title: updatedTitle,
                    author: updatedAuthor,
                    year: updatedYear,
                    description: updatedDescription
                };
                saveAndReload(savedImages);
            }

            uploadButton.innerText = "Завантажити";
            uploadButton.onclick = addNewImage;
        };
    }

    function addNewImage() {
        let title = imageTitleInput.value.trim();
        let author = imageAuthorInput.value.trim();
        let year = imageYearInput.value.trim();
        let description = imageDescriptionInput.value.trim();

        if (!title) {
            alert("Будь ласка, введіть назву ілюстрації!");
            return;
        }

        if (year && (new Date(year).getFullYear() > 2025)) {
            alert("Будь ласка, введіть коректний рік (не більше 2025).");
            return;
        }

        if (uploadInput.files && uploadInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                const imageSrc = e.target.result;

                if (!imageSrc) {
                    alert("Не вдалося отримати зображення. Спробуйте ще раз.");
                    return;
                }

                const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
                savedImages.push({ src: imageSrc, title, author, year, description });
                saveAndReload(savedImages);
            };
            reader.readAsDataURL(uploadInput.files[0]);
        } else {
            alert("Будь ласка, виберіть файл для завантаження.");
        }
    }

    function deleteImage(index) {
        if (confirm("Ви впевнені, що хочете видалити цю ілюстрацію?")) {
            const savedImages = JSON.parse(localStorage.getItem("portfolioImages")) || [];
            savedImages.splice(index, 1);
            saveAndReload(savedImages);
        }
    }

    function saveAndReload(images) {
        localStorage.setItem("portfolioImages", JSON.stringify(images));
        loadGallery();
        resetForm();
    }

    function resetForm() {
        imageTitleInput.value = "";
        imageAuthorInput.value = "";
        imageYearInput.value = "";
        imageDescriptionInput.value = "";
        uploadInput.value = "";
    }

    clearGalleryButton.addEventListener("click", function () {
        if (confirm("Ви впевнені, що хочете очистити всю галерею?")) {
            localStorage.removeItem("portfolioImages");
            gallery.innerHTML = "";
        }
    });

    uploadButton.onclick = addNewImage;

    loadGallery();
});
