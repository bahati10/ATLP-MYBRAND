document.addEventListener("DOMContentLoaded", function () {
    displaySingleBlog();
});

let commentLabel = document.querySelector(".comment-label");

function displaySingleBlog() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const blogData = JSON.parse(localStorage.getItem("blogData")) || [];
    const blog = blogData.find(blog => blog.id === blogId);

    if (blog) {
        const imageElement = document.querySelector(".blog-image");
        const titleElement = document.querySelector(".title");
        const subtitleElement = document.querySelector(".subtitle");
        const authorElement = document.querySelector(".author-box");
        const contentElement = document.querySelector(".main-content");

        imageElement.src = blog.image;
        titleElement.textContent = blog.title;
        subtitleElement.textContent = blog.subtitle;
        authorElement.textContent = `Authored by Bahati on ${formatTimestamp(blog.timestamp)}`;
        contentElement.innerHTML = blog.content;

        if (blog.comments && Array.isArray(blog.comments)) {
            displayComments(blog.comments);
        } else {
            console.error("Comments are missing or not in the correct format.");
        }

    } else {
        const blogContainer = document.querySelector(".blog-container");
        blogContainer.innerHTML = "<p>Blog not found</p>";
    }
}


function validateComment() {
    const input = document.querySelector(".comment-input").value;
    if (input.length < 1) {
        commentLabel.style.color = "#E87B7B"
        commentLabel.innerHTML = "Comment can't be Empty";
        return false;
    } 
        commentLabel.innerHTML = '✅';
        return true;
    }


function validateForm() {
    if (!validateComment()) {
        commentLabel.innerHTML = "PLease fix this errors";
    } else {
        commentLabel.style.display = "flex"
        commentLabel.style.color = "#6eeb83";
        commentLabel.innerHTML = "Blog Added!";
        postComment();
        resetForm();
    }
} 


function displayComments(comments) {
    const commentContainer = document.querySelector(".comment-container");
    commentContainer.innerHTML = "";

    comments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment-box");
        commentElement.innerHTML = `
            <div class="owner">${comment.owner}</div>
            <div class="date-created">${comment.date}</div>
            <div class="comment-text">${comment.text}</div>
        `;
        commentContainer.appendChild(commentElement);
        const commentsTitle = document.querySelector(".comments-title");
        commentsTitle.textContent = `comments (${comments.length})`;
    });
}

function postComment() {
    const commentLabel = document.querySelector(".comment-label").value;
    const input = document.querySelector(".comment-input");
    const commentText = input.value.trim();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return; // Stop execution here
    }

    if (commentText !== "") {
        const owner = sessionStorage.getItem("Names") || "Author";
        const date = formatTimestamp(new Date());
        const commentId = generateId();
        const newComment = { id: commentId, owner, date, text: commentText };

        const blogId = new URLSearchParams(window.location.search).get('id');
        const blogData = JSON.parse(localStorage.getItem("blogData")) || [];
        const blog = blogData.find(blog => blog.id === blogId);

        if (blog) {
            blog.comments.push(newComment);
            localStorage.setItem("blogData", JSON.stringify(blogData));

            const commentCount = blog.comments.length;
            const commentTitle = document.querySelector(".comments-title");
            commentTitle.textContent = `Comments ( ${commentCount} )`;
            displayComments(blog.comments);
        } else {
            console.error("Blog not found.");
        }

        input.value = "";
    }
}

function resetForm() {
    commentLabel.innerHTML= ""
    commentLabel.style.color= ""
}   



const deleteButton = document.querySelector(".delete-model .delete-btn");

deleteButton.addEventListener("click", () => {

    const blogId = new URLSearchParams(window.location.search).get('id');
    let blogData = JSON.parse(localStorage.getItem("blogData")) || [];
    blogData = blogData.filter(blog => blog.id !== blogId);

    localStorage.setItem("blogData", JSON.stringify(blogData));

    window.location.href = "blog.html";
});


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === "/Single-blog.html") {
        checkAuth();
    }
});

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    const actionButtons = document.querySelector(".buttons");
    const expectedUserEmail = 'admin@gmail.com';

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (!isLoggedIn || userEmail !== expectedUserEmail) {
        actionButtons.style.display = "none";
        console.log('Unauthorized access detected. Redirecting to login page.');
    } else {
        actionButtons.style.display = "flex";
    }
}

const postButton = document.querySelector(".post");
postButton.addEventListener("click", function(event) {
    event.preventDefault();
    postComment();
});



function generateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}


function formatTimestamp(timestamp) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
}

document.querySelector(".post").addEventListener("click", postComment);