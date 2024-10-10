document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            // Highlight active link
            const currentPath = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-menu a'); // Select all nav links
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active'); // Add active class to the current page's link
                }
            });

            // Collapse navigation functionality
            const collapseBtn = document.getElementById('collapse-btn');
            const sideNav = document.getElementById('side-nav');
            if (collapseBtn && sideNav) {
                collapseBtn.addEventListener('click', function () {
                    sideNav.classList.toggle('collapsed');
                });
            }

            // Profile dropdown toggle
            const profileBtn = document.getElementById('profile-btn');
            const profileDropdown = document.getElementById('profile-dropdown');
            if (profileBtn && profileDropdown) {
                profileBtn.addEventListener('click', function () {
                    profileDropdown.classList.toggle('open');
                });
            }

            // Add dropdown toggle
            const addBtn = document.getElementById('add-btn');
            const addDropdown = document.getElementById('add-dropdown');
            if (addBtn && addDropdown) {
                addBtn.addEventListener('click', function () {
                    addDropdown.classList.toggle('open');
                });
            }

            // Alerts dropdown toggle
            const alertsBtn = document.getElementById('alerts-btn');
            const alertsDropdown = document.getElementById('alerts-dropdown');
            if (alertsBtn && alertsDropdown) {
                alertsBtn.addEventListener('click', function () {
                    alertsDropdown.classList.toggle('open');
                });
            }

            // Mobile nav drawer functionality
            const mobileCollapseBtn = document.getElementById('mobile-collapse-btn');
            const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
            if (mobileCollapseBtn && mobileNavDrawer) {
                mobileCollapseBtn.addEventListener('click', function () {
                    mobileNavDrawer.classList.toggle('open');
                });

                // Close mobile nav drawer if clicked outside
                window.addEventListener('click', function (event) {
                    if (!mobileNavDrawer.contains(event.target) && !mobileCollapseBtn.contains(event.target)) {
                        mobileNavDrawer.classList.remove('open');
                    }
                });
            }

            const userName = localStorage.getItem('userName');

            if (userName) {
                // Update the name in the navbar if the user is logged in
                document.getElementById('user-name').textContent = userName;
            }

            // Log out functionality
            document.getElementById('logout').addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = '/login.html'; // Redirect to login page after logout
            });

            window.addEventListener('load', () => {
                const token = localStorage.getItem('token');
                const userName = localStorage.getItem('userName');
            
                if (!token || !userName) {
                    // If there's no token, redirect to login
                    window.location.href = 'login.html';
                } else {
                    // If user is logged in, display their name
                    document.getElementById('user-name').textContent = userName;
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));
});
