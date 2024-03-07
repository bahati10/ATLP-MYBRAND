const form = document.querySelector(".message-form")
let firstNameLabel = document.querySelector(".first-name-label")
let lastNameLabel = document.querySelector(".last-name-label")
let emailLabel = document.querySelector(".email-label")
let messageLabel = document.querySelector(".message-label")


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
    if (email.length < 1) {
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

function validateMessage() {
    const message = document.querySelector("#message-text").value
    if (message.length < 1) {
        messageLabel.style.color = "#E87B7B"
        messageLabel.innerHTML = "Message can't be Empty";
        return false;
    } 
        messageLabel.innerHTML = '✅';
        return true;
}

function validateForm() {
    let submitError = document.querySelector(".submit-error");
    if (!validateFirstName() || !validateLastName() || !validateEmail() || !validateMessage()) {
        submitError.innerHTML = "PLease fix above errors";
    } else {
        submitError.style.display = "flex"
        submitError.style.color = "#6eeb83";
        submitError.innerHTML = "Message Sent!";
        setData();
    }
}

const setData = () => {

    let messageData = JSON.parse(localStorage.getItem("messageData")) || [];
    let newMessage = {
        firstName: document.querySelector(".first-name-input").value,
        lastName: document.querySelector(".last-name-input").value,
        email: document.querySelector(".email-input").value,
        message: document.querySelector("#message-text").value
    };
    messageData.push(newMessage);
    localStorage.setItem("messageData", JSON.stringify(messageData));

    resetForm();
};

let resetForm = () => {
    const firstNameInput = document.querySelector(".first-name-input");
    const lastNameInput = document.querySelector(".last-name-input");
    const emailInput = document.querySelector(".email-input");
    const messageInput = document.querySelector("#message-text");

    const submitError = document.querySelector(".submit-error");

    // Reset input values
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    // Reset label texts and styles
    firstNameLabel.style.color = "";
    firstNameLabel.innerHTML = 'First Name';

    lastNameLabel.style.color = "";
    lastNameLabel.innerHTML = 'Last Name';

    emailLabel.style.color = "";
    emailLabel.innerHTML = 'Email';

    messageLabel.style.color = "";
    messageLabel.innerHTML = 'Message';

    // Reset submit error message
    submitError.innerHTML = "";
};

