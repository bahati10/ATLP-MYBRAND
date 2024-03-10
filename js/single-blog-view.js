document.addEventListener("DOMContentLoaded", function () {
    displaySingleBlog();
});

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
        authorElement.textContent = `Authored by ${blog.author} on ${formatTimestamp(blog.timestamp)}`;
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
    const input = document.querySelector(".comment-input");
    const commentText = input.value.trim();
    if (commentText !== "") {
        const owner = "Name";
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
            commentTitle.textContent = `Comments (${commentCount})`;

            displayComments(blog.comments);
        } else {
            console.error("Blog not found.");
        }

        input.value = "";
    }
}

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
