document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.');
    if (window.location.pathname === "/updateblog.html" || window.location.pathname === "/updateblog.html") {
        checkAuth();
    }
});


function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    const expectedUserEmail = 'admin@gmail.com';

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userEmail:', userEmail);

    if (userEmail !== expectedUserEmail) {
        console.log('Unauthorized access detected. Redirecting to login page.');
        window.location.href = "blog.html";
    }
}