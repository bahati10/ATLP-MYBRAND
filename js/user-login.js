const form = document.querySelector(".login-form");
const loginButton = document.querySelector(".login-btn");
let emailLabel = document.querySelector(".email-label");
let passwordLabel = document.querySelector(".password-label");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateLoginForm();
});

if (!localStorage.getItem("adminData")) {
  const AdminEmail = "admin@gmail.com";
  const AdminPassword = "admin123";

  let adminData = [
    {
      email: AdminEmail,
      password: AdminPassword,
    },
  ];

  localStorage.setItem("adminData", JSON.stringify(adminData));
}

function validateEmail() {
  const email = document.querySelector(".email-input").value;
  if (email.length === 0) {
    emailLabel.style.color = "#E87B7B";
    emailLabel.innerHTML = "Email required";
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
    emailLabel.style.color = "#E87B7B";
    emailLabel.innerHTML = "Invalid Email";
    return false;
  }
  emailLabel.innerHTML = "✅";
  return true;
}

function validateLoginForm() {
  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;
  let submitError = document.querySelector(".submit-error");

  if (!validateEmail(email)) {
    submitError.innerHTML = "Invalid Email";
  } else if (!validatePassword(password)) {
    submitError.innerHTML = "Incorrect Password";
  } else {
    adminLogin(email, password);
  }
}

function validatePassword() {
  const password = document.querySelector(".password-input").value;
  if (password.length < 1) {
    passwordLabel.style.color = "#E87B7B";
    passwordLabel.innerHTML = "Password required";
    return false;
  }

  if (password.length < 8) {
    passwordLabel.style.color = "#E87B7B";
    passwordLabel.innerHTML = "Password Must be 8 characters or more";
    return false;
  }
  passwordLabel.innerHTML = "✅";
  return true;
}

function compare(email, password) {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let submitError = document.querySelector(".submit-error");

  let foundUser = userData.find((user) => {
    return user.email === email && user.password === password;
  });

  if (foundUser) {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem(
      "Names",
      `${foundUser.firstName} ${foundUser.lastName}`
    );

    submitError.innerHTML = "✅";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 1500);
    console.log(`User with email ${email} and password ${password} found`);
    next();
  } else {
    submitError.innerHTML = "Check email or password and Try again!";
    submitError.style.color = "#bbb";
    resetForm();
    const addblog = document.querySelector(".addblog");
    addblog.style.display = "none";
  }
}

function adminLogin(email, password) {
  let adminInfo = JSON.parse(localStorage.getItem("adminData"));
  let submitError = document.querySelector(".submit-error");

  let found = adminInfo.some((admin) => {
    return admin.email === email && admin.password === password;
  });

  if (found) {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userEmail", email);

    submitError.innerHTML = "✅";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 1500);
    console.log(`Admin with email ${email} and password ${password} found`);
    adminNext();
  } else {
    compare(email, password);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");
  if (window.location.pathname === "/login.html") {
    loginLoop();
  }
});

function loginLoop() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("userEmail");

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userEmail:", userEmail);

  if (isLoggedIn) {
    console.log("Unauthorized access detected. Redirecting to login page.");
    window.location.href = "blog.html";
  }
}

function next() {
  window.setTimeout(function () {
    window.location.href = "blog.html";
  }, 1700);
}

function adminNext() {
  window.setTimeout(function () {
    window.location.href = "users.html";
  }, 1700);
}

function resetForm() {
  document.querySelector(".email-input").value = "";
  document.querySelector(".password-input").value = "";
  emailLabel.innerHTML = "";
  passwordLabel.innerHTML = "";
}
