const Cancel = document.querySelector(".cancel-btn");
const Delete = document.querySelector(".delete-btn");
const DeleteBlog = document.querySelector(".delete");
const DeleteModel = document.querySelector(".delete-model")


    DeleteBlog.addEventListener('click', function() {
        DeleteModel.style.display = "flex";
    });

    Cancel.addEventListener('click', function() {
        DeleteModel.style.display = "none";
    });