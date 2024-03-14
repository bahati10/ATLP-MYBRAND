document.addEventListener("DOMContentLoaded", function () {
  populateBlog();
});

function populateBlog() {
  const blogData = JSON.parse(localStorage.getItem("blogData")) || [];
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  if (blogData.length === 0) {
    const noArticle = document.querySelector(".no-article");
    noArticle.style.display = "flex";
  } else {
    blogData.forEach((blog, index) => {
      const row = document.createElement("tr");

      const numberCell = document.createElement("td");

      if (numberCell < 1) {
      }
      numberCell.textContent = index + 1;
      row.appendChild(numberCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = "Author Name";
      row.appendChild(nameCell);

      const titleCell = document.createElement("td");
      titleCell.textContent = blog.title;
      row.appendChild(titleCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = blog.timestamp;
      row.appendChild(dateCell);

      const actionCell = document.createElement("td");
      const deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.textContent = "Delete";
      deleteLink.style.color = "#E87B7B";
      deleteLink.style.textDecoration = "underline";
      deleteLink.addEventListener("click", function (event) {
        event.preventDefault();
        deleteBlog(index);
      });
      actionCell.appendChild(deleteLink);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");
  if (window.location.pathname === "/articles.html") {
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
    window.location.href = "login.html";
  }
}

const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", function () {
  logOut();
});

function logOut() {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("userEmail");
  window.location.href = "/blog.html";
}

function deleteBlog(index) {
  let blogData = JSON.parse(localStorage.getItem("blogData")) || [];
  blogData.splice(index, 1);
  localStorage.setItem("blogData", JSON.stringify(blogData));
  populateBlog();
}
