const Cancel = document.querySelector(".cancel-btn");
const Delete = document.querySelector(".delete-btn");
const DeleteBlog = document.querySelector(".delete");
const DeleteModel = document.querySelector(".delete-model")


    function redirect(url) {
        window.location.href = url;
    }

    Delete.addEventListener('click', function() {
        redirect('/blog.html');
    });

    DeleteBlog.addEventListener('click', function() {
        DeleteModel.style.display = "flex";
    });

    Cancel.addEventListener('click', function() {
        DeleteModel.style.display = "none";
    });
