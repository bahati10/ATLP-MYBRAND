const form = document.querySelector(".signup-form")
const signupButton = document.querySelector(".signup-btn")
let firstNameLabel = document.querySelector(".first-name-label")
let lastNameLabel = document.querySelector(".last-name-label")
let emailLabel = document.querySelector(".email-label")
let passwordLabel = document.querySelector(".password-label")


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})


function validateFirstName() {
    const firstName = document.querySelector(".first-name-input").value
    if (firstName.length < 3) {
        firstNameLabel.style.color = "#E87B7B"
        firstNameLabel.innerHTML = 'Name required';
        return false;
    } 
    
    if (!firstName.match(/^[A-Za-z]+$/)) {
        passwordLabel.style.color = "#E87B7B"
        firstNameLabel.innerHTML = 'Name should have letters only';
        return false;
    } 
        firstNameLabel.innerHTML = '✅';
        return true;
}

function validateLastName() {
    const lastName = document.querySelector(".last-name-input").value
    if (lastName.length < 3) {
        lastNameLabel.style.color = "#E87B7B"
        lastNameLabel.innerHTML = 'Name required';
        return false;
    } 
    
    if (!lastName.match(/^[A-Za-z]+$/)) {
        passwordLabel.style.color = "#E87B7B"
        lastNameLabel.innerHTML = 'Name should have letters only';
        return false;
    } 
        lastNameLabel.innerHTML = '✅';
        return true;
}

function validateEmail() {
    const email = document.querySelector(".email-input").value
    if (email.length < 3) {
        emailLabel.style.color = "#E87B7B"
        emailLabel.innerHTML = 'Email required';
        return false;
    } 
    
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
        emailLabel.style.color = "#E87B7B"
        emailLabel.innerHTML = 'Invalid Email';
        return false;
    } 
        emailLabel.innerHTML = '✅';
        return true;
}

function validatePassword() {
    const password = document.querySelector(".password-input").value
    if (password.length < 1) {
        passwordLabel.style.color = "#E87B7B"
        passwordLabel.innerHTML = 'Password required';
        return false;
    } 
    
    if (password.length < 8) {
        passwordLabel.style.color = "#E87B7B"
        passwordLabel.innerHTML = 'Password Must be 8 characters or more';
        return false;
    } 
        passwordLabel.innerHTML = '✅';
        return true;
}

function validateForm() {
    let submitError = document.querySelector(".submit-error");
    if (!validateFirstName() || !validateLastName() || !validateEmail() || !validatePassword()) {
        submitError.innerHTML = "PLease fix above errors";
    } else {
        if (emailExists()) {
            submitError.innerHTML = "Email already exists";
            setTimeout(function () { submitError.style.display = "none" }, 1500)
        } else {
            setData();
        }
    }
}

function emailExists() {
    const email = document.querySelector(".email-input").value;
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    return storedData.some(user => user.email === email);
}



const setData = () => {

    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    let newUser = {
        id: generateId(),
        firstName: document.querySelector(".first-name-input").value,
        lastName: document.querySelector(".last-name-input").value,
        email: document.querySelector(".email-input").value,
        password: document.querySelector(".password-input").value
    };
    userData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userData));

    form.reset();
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


let next = () => {
    window.setTimeout(function () {
        window.location.href = "login.html";

    }, 1700);
}

let resetForm = () => {
    firstNameValue = "";
    lastNameValue = "";
    emailValue = "";
    passwordValue = "";
    firstNameLabel.innerHTML = "";
    lastNameLabel.innerHTML = "";
    emailLabel.innerHTML = "";
    passwordLabel.innerHTML = "";
}
