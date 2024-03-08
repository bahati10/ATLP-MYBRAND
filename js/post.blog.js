document.addEventListener("DOMContentLoaded", function () {
    addBlogsToHTML();
});

const blogHolder = document.querySelector(".blog-holder");
const blogData = JSON.parse(localStorage.getItem("blogData")) || [];


function createBlogHTML(blog) {
    return `
    <div class="blog">
        <div class="blog-image">
            <img src="${blog.image}" alt="Blog Image" class="blog-photo">
        </div>
        <a href="/Single-blog.html">
            <div class="content">
               <div class="title">${blog.title}</div>
                <div class="date">${blog.author} - ${blog.timestamp}</div>
                <div class="des">${blog.subtitle}</div>
            </div>
        </a>
    </div>`;
}

function addBlogsToHTML() {
    blogHolder.innerHTML = "";
    
    blogData.forEach(blog => {
        const blogHTML = createBlogHTML(blog);
        blogHolder.insertAdjacentHTML("beforeend", blogHTML);
    });
}

addBlogsToHTML();
