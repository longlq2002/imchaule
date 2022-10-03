const workTitleField = document.querySelector(".title");

// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");

bannerImage.addEventListener("change", () => {
    uploadImage(bannerImage, "banner");
});

const uploadImage = (uploadFile, uploadType) => {
    const [ file ] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append("image", file);

        fetch("/api/upload", {
            method: "POST",
            body: formdata
        }).then(res => res.json())
            .then(data => {
                bannerPath = `/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            });
    } else {
        alert("upload Image only");
    }
};


publishBtn.addEventListener("click", () => {
    if (workTitleField.value.length) {
        const blog = {
            title: workTitleField.value,
            image: bannerPath,
        };

        fetch("/api/portfolio/" + workId, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        }).then((res) => res.json())
            .then((data) => {
                location.href = "/admin/portfolio";
            }).catch((err) => {
            console.error(err);
        });
    }
});