const blogTitleField = document.querySelector(".title");
const articleField = document.querySelector(".article");

// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener("change", () => {
    uploadImage(uploadInput, "image");
})

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
                if (uploadType === "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `/${data}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

publishBtn.addEventListener("click", () => {
    if (articleField.value.length && blogTitleField.value.length) {
        const blog = {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
        }

        fetch("/api/blogs", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        }).then((res) => res.json())
            .then((data) => {
                location.href = "/admin/blogs";
            }).catch((err) => {
            console.error(err);
        })
    }
})