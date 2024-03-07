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

    let adminData = [{
        email: AdminEmail,
        password: AdminPassword
    }];

    localStorage.setItem("adminData", JSON.stringify(adminData));
}

function validateEmail(email) {
    if (email.length === 0) {
        emailLabel.style.color = "#E87B7B";
        emailLabel.innerHTML = 'Email required';
        return false;
    }

    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
        emailLabel.style.color = "#E87B7B";
        emailLabel.innerHTML = 'Invalid Email';
        return false;
    }
    emailLabel.innerHTML = '✅';
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
        adminLogin(email, password); // Pass email and password to adminLogin
    }
}

function validatePassword(password) {
    if (password.length < 1) {
        passwordLabel.style.color = "#E87B7B";
        passwordLabel.innerHTML = 'Password required';
        return false;
    }

    if (password.length < 8) {
        passwordLabel.style.color = "#E87B7B";
        passwordLabel.innerHTML = 'Password Must be 8 characters or more';
        return false;
    }
    passwordLabel.innerHTML = '✅';
    return true;
}

function compare(email, password) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let submitError = document.querySelector(".submit-error");

    let found = userData.some(user => {
        return user.email === email && user.password === password;
    });

    if (found) {
        submitError.innerHTML = '✅';
        setTimeout(function () { submitError.style.display = "none" }, 1500);
        console.log(`User with email ${email} and password ${password} found`);
        next();
    } else {
        submitError.innerHTML = 'Check email or password and Try again!';
        submitError.style.color ="#bbb";
        resetForm();
    }
}

function adminLogin(email, password) {
    let adminInfo = JSON.parse(localStorage.getItem("adminData"));
    let submitError = document.querySelector(".submit-error");

    let found = adminInfo.some(admin => {
        return admin.email === email && admin.password === password;
    });

    if (found) {
        submitError.innerHTML = '✅';
        setTimeout(function () { submitError.style.display = "none" }, 1500);
        console.log(`Admin with email ${email} and password ${password} found`);
        adminNext();
    } else {
        compare(email, password); // Pass email and password to compare
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
