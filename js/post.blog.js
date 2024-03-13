document.addEventListener("DOMContentLoaded", function () {
    addBlogsToHTML();
});

const blogHolder = document.querySelector(".blog-holder");
const blogData = JSON.parse(localStorage.getItem("blogData")) || [];


function createBlogHTML(blog) {
    return `fauth
    <div class="blog">
        <div class="blog-image">
            <img src="${blog.image}" alt="Blog Image" class="blog-photo">
        </div>
        <a href="/Single-blog.html?id=${blog.id}">
            <div class="content">
               <div class="title">${blog.title}</div>
                <div class="date">Bahati - ${blog.timestamp}</div>
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


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === "/blog.html") {
        checkAuth();
    }
});

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    const logoutButton = document.querySelector(".login-btn");
    const logoutLink = document.querySelector(".login a");
    const addBlogButton = document.querySelector('.addblog');

    const expectedUserEmail = 'admin@gmail.com';

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (!isLoggedIn) {
        addBlogButton.style.display = 'none';
    } else if(userEmail === expectedUserEmail) {
        logoutButton.textContent = "Log out";
        logoutLink.href = "#";
        addBlogButton.style.display = 'flex';
    } else{
        logoutButton.textContent = "Log out";
        logoutLink.href = "#";
        addBlogButton.style.display = 'none';
    }
}

const logoutButton = document.querySelector(".login-btn");

logoutButton.addEventListener('click', function() {
    logOut();
})

function logOut() {
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('Names');
    window.location.href = "/blog.html";
}