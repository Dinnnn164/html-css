document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadButton");
    const uploadInput = document.getElementById("uploadInput");
    const imageTitleInput = document.getElementById("imageTitle");
    const gallery = document.querySelector(".gallery");

    uploadButton.addEventListener("click", function () {
        let title = imageTitleInput.value.trim();
        if (!title) {
            alert("Будь ласка, введіть назву ілюстрації!");
            return;
        }

        if (uploadInput.files && uploadInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let newImage = document.createElement("div");
                newImage.classList.add("gallery-item");
                newImage.innerHTML = `<img src="${e.target.result}" alt="Завантажений малюнок"><p>${title}</p>`;

                gallery.insertBefore(newImage, gallery.firstChild);

                imageTitleInput.value = "";
                uploadInput.value = "";
            };
            reader.readAsDataURL(uploadInput.files[0]);
        }
    });
});
