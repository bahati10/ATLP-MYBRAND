document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");
  if (window.location.pathname === "/updateblog.html") {
    checkAuth();
  }
});

function checkAuth() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("userEmail");

  const expectedUserEmail = "admin@gmail.com";

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userEmail:", userEmail);

  if (userEmail !== expectedUserEmail) {
    console.log("Unauthorized access detected. Redirecting to login page.");
    window.location.href = "blog.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadBlogData();

  const updateForm = document.querySelector(".update-form");
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
  });
});

function loadBlogData() {
  const blogId = localStorage.getItem("currentBlogId");
  console.log("Blog ID:", blogId);
  const blogData = getBlogDataById(blogId);

  if (blogData) {
    document.querySelector(".image-input").value = blogData.image;
    document.querySelector(".title-input").value = blogData.title;
    document.querySelector(".subtitle-input").value = blogData.subtitle;
    document.querySelector(".content-input").value = blogData.content;
  } else {
    console.error(`Blog data not found for ID: ${blogId}`);
  }
}

function getBlogDataById(blogId) {
  let blogData = JSON.parse(localStorage.getItem("blogData")) || [];
  return blogData.find((blog) => blog.id === blogId);
}

function validateForm() {
  updateBlogData();
  resetForm();
}

function updateBlogData() {
  const blogId = localStorage.getItem("currentBlogId");
  let blogData = JSON.parse(localStorage.getItem("blogData")) || [];

  let index = blogData.findIndex((blog) => blog.id === blogId);
  if (index !== -1) {
    const imageInput = document.querySelector(".image-input").value;
    const titleInput = document.querySelector(".title-input").value;
    const subtitleInput = document.querySelector(".subtitle-input").value;
    const contentInput = document.querySelector(".content-input").value;

    if (imageInput.trim() !== "") {
      blogData[index].image = imageInput;
    }
    if (titleInput.trim() !== "") {
      blogData[index].title = titleInput;
    }
    if (subtitleInput.trim() !== "") {
      blogData[index].subtitle = subtitleInput;
    }
    if (contentInput.trim() !== "") {
      blogData[index].content = contentInput;
    }

    localStorage.setItem("blogData", JSON.stringify(blogData));
    window.location.href = "blog.html";
  }
}

let resetForm = () => {
  let imageInput = document.querySelector(".image-input");
  let titleInput = document.querySelector(".title-input");
  let subtitleInput = document.querySelector(".subtitle-input");
  let contentInput = document.querySelector(".content-input");

  // Reset input values
  imageInput.value = "";
  titleInput.value = "";
  subtitleInput.value = "";
  contentInput.value = "";
};
