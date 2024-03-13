document.addEventListener("DOMContentLoaded", function () {
    populateMessage();
});

function populateMessage() {
    const messageData = JSON.parse(localStorage.getItem("messageData")) || [];
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    if (messageData.length === 0) {
        const noMessage = document.querySelector(".no-message")
        noMessage.style.display = "flex"
    } else {

    messageData.forEach((message, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");

        if(numberCell < 1){

        }
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = `${message.firstName} ${message.lastName}`;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = message.message;
        row.appendChild(emailCell);

        const actionCell = document.createElement("td");
        const deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.textContent = "Delete";
        deleteLink.style.color = "#E87B7B";
        deleteLink.style.textDecoration = "underline";
        deleteLink.addEventListener("click", function(event) {
            event.preventDefault();
            deleteMessage(index);
        });
        actionCell.appendChild(deleteLink);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === "/messages.html") {
        checkAuth();
    }
});


function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    const expectedUserEmail = 'admin@gmail.com';

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (!userEmail !== expectedUserEmail) {
        console.log('Unauthorized access detected. Redirecting to login page.');
        window.location.href = "login.html";
    }
}

const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener('click', function() {
    logOut();
})

function logOut() {
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('userEmail');
    window.location.href = "/blog.html";
}


function deleteMessage(index) {
    let messageData = JSON.parse(localStorage.getItem("messageData")) || [];
    messageData.splice(index, 1);
    localStorage.setItem("messageData", JSON.stringify(messageData));
    populateMessage();
}