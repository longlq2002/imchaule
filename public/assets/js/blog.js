const blogSlug = decodeURI(location.pathname.split("/").pop());

fetch("/api/blogs/" + blogSlug)
    .then(res => res.json())
    .then(data => setupBlog(data.blog));

const setupBlog = (blog) => {
    const banner = document.querySelector(".banner");
    const blogTitle = document.querySelector(".title");
    const titleTag = document.querySelector("title");
    const publish = document.querySelector(".published");

    banner.style.backgroundImage = `url(${blog.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = blog.title;
    publish.innerHTML += new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        day: "numeric"
    });

    const article = document.querySelector(".article");
    addArticle(article, blog.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if (item[0] == "#") {
            let hCount = 0;
            let i = 0;
            while (item[i] == "#") {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        }
        //checking for image format
        else if (item[0] == "!" && item[1] == "[") {
            let seperator;

            for (let i = 0; i <= item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="/${src}" alt="${alt}" class="article-image">
            `;
        } else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}