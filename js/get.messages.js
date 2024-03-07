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
        emailCell.textContent = message.email;
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


function deleteMessage(index) {
    let messageData = JSON.parse(localStorage.getItem("messageData")) || [];
    messageData.splice(index, 1);
    localStorage.setItem("messageData", JSON.stringify(messageData));
    populateMessage();
}