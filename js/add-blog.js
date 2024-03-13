const form = document.querySelector(".add-form")
let imageLabel = document.querySelector(".image-label")
let titleLabel = document.querySelector(".title-label")
let subtitleLabel = document.querySelector(".subtitle-label")
let contentLabel = document.querySelector(".content-label")




form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateImage() {
    const image = document.querySelector(".image-input").value
    if (image.length === 0) {
        imageLabel.style.color = "#E87B7B"
        imageLabel.innerHTML = 'URL required';
        return false;
    } 
        imageLabel.innerHTML = '✅';
        return true;
}


function validateTitle() {
    const title = document.querySelector(".title-input").value
    if (title.length < 1) {
        titleLabel.style.color = "#E87B7B"
        titleLabel.innerHTML = "Title can't be Empty";
        return false;
    } else if (title.length < 30) {
        titleLabel.style.color = "#E87B7B"
        titleLabel.innerHTML = 'The small for a Title';
        return false;
    } else {
        titleLabel.innerHTML = '✅';
        return true;
    }

}


function validateSubtitle() {
    const subtitle = document.querySelector(".subtitle-input").value
    if (subtitle.length < 1) {
        subtitleLabel.style.color = "#E87B7B"
        subtitleLabel.innerHTML = "Subtitle can't be Empty";
        return false;
    } 

    if (subtitle.length < 40) {
        subtitleLabel.style.color = "#E87B7B"
        subtitleLabel.innerHTML = 'The subtitle is too small';
        return false;
    } 
        subtitleLabel.innerHTML = '✅';
        return true;
}

function validateContent() {
    const content = document.querySelector(".content-input").value
    if (content.length < 1) {
        contentLabel.style.color = "#E87B7B"
        contentLabel.innerHTML = "Content can't be Empty";
        return false;
    } 

    if (content.length < 80) {
        contentLabel.style.color = "#E87B7B"
        contentLabel.innerHTML = 'Too Content small';
        return false;
    } 
        contentLabel.innerHTML = '✅';
        return true;
}


function validateForm() {
    let submitError = document.querySelector(".submit-error");
    if (!validateImage() || !validateTitle() || !validateSubtitle() || !validateContent()) {
        submitError.innerHTML = "PLease fix above errors";
    } else {
        submitError.style.display = "flex"
        submitError.style.color = "#6eeb83";
        submitError.innerHTML = "Blog Added!";
        checkAuth()
        resetForm();
    }
}

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');

    const expectedUserEmail = 'admin@gmail.com';    

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (!isLoggedIn && userEmail !== expectedUserEmail ) {
        console.log('Unauthorized access detected. Redirecting to login page.');
        window.location.href = "login.html";
    } else{
        setData();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === '/users.html') {
        console.log('Checking authentication for specific route.');
        checkAuth();
    }
});


const setData = () => {

    let blogData = JSON.parse(localStorage.getItem("blogData")) || [];
    let adminData = JSON.parse(localStorage.getItem("adminData")) || [];

    let newBlog = {
        id: generateId(),
        author: "Bahati",
        image: document.querySelector(".image-input").value,
        title: document.querySelector(".title-input").value,
        subtitle: document.querySelector(".subtitle-input").value,
        content: document.querySelector(".content-input").value,
        comments: [],
        timestamp: formatTimestamp(new Date()) 
    };
    blogData.push(newBlog);
    localStorage.setItem("blogData", JSON.stringify(blogData));
    next();
};

const generateId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
};


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === "/addblog.html" || window.location.pathname === "/updateblog.html") {
        checkAuth();
    }
});


function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    const expectedUserEmail = 'admin@gmail.com';

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (userEmail !== expectedUserEmail) {
        console.log('Unauthorized access detected. Redirecting to login page.');
        window.location.href = "blog.html";
    }
}


function formatTimestamp(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


function next() {
    window.setTimeout(function () {
        window.location.href = "blog.html";
    }, 1700);
}


let resetForm = () => {
    let imageInput = document.querySelector(".image-input");
    let titleInput = document.querySelector(".title-input");
    let subtitleInput = document.querySelector(".subtitle-input");
    let contentInput = document.querySelector(".content-input");
    let submitError = document.querySelector(".submit-error");

    // Reset input values
    imageInput.value = "";
    titleInput.value = "";
    subtitleInput.value = "";
    contentInput.value = "";

    // Reset label texts and styles
    imageLabel.style.color = "";
    imageLabel.innerHTML = 'Image';

    titleLabel.style.color = "";
    titleLabel.innerHTML = 'Title';

    subtitleLabel.style.color = "";
    subtitleLabel.innerHTML = 'Subtitle';

    contentLabel.style.color = "";
    contentLabel.innerHTML = 'Content';

    // Reset submit error message
    submitError.innerHTML = "";
};