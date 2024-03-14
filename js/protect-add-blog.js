document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");
  if (window.location.pathname === "/addblog.html") {
    checkAdminAuth();
  }
});

function checkAdminAuth() {
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
