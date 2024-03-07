document.addEventListener("DOMContentLoaded", function () {
    populateUsers();
});

function populateUsers() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    userData.forEach((user, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = `${user.firstName} ${user.lastName}`;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const actionCell = document.createElement("td");
        const deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.textContent = "Delete";
        deleteLink.style.color = "#E87B7B";
        deleteLink.style.textDecoration = "underline";
        deleteLink.addEventListener("click", function(event) {
            event.preventDefault();
            deleteUser(index);
        });
        actionCell.appendChild(deleteLink);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}


function deleteUser(index) {
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(userData));
    populateUsers();
}