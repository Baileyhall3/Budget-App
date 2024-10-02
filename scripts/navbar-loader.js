document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            var currentPath = window.location.pathname;

            var homeLink = document.getElementById("home-link");
            var potsLink = document.getElementById("pots-link");
            var budgetLink = document.getElementById("budget-link");
            var reportsLink = document.getElementById("reports-link");
            var settingsLink = document.getElementById("settings-link");

            // Determine which link should be active based on the current page
            if (currentPath.includes("index.html")) {
                homeLink.classList.add("active");
            } else if (currentPath.includes("pots.html")) {
                potsLink.classList.add("active");
            } else if (currentPath.includes("budget.html")) {
                budgetLink.classList.add("active");
            } else if (currentPath.includes("reports.html")) {
                reportsLink.classList.add("active");
            } else if (currentPath.includes("settings.html")) {
                settingsLink.classList.add("active");
            }

            // Collapse/Expand functionality
            var nav = document.getElementById('side-nav');
            var collapseBtn = document.getElementById('collapse-btn');

            collapseBtn.addEventListener('click', function() {
                nav.classList.toggle('collapsed');
            });
        
            // Toggle dark mode
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            const body = document.body;
        
            // Check localStorage for saved dark mode preference
            if (localStorage.getItem('dark-mode') === 'enabled') {
                enableDarkMode();
            }
        
            // Add event listener for the dark mode toggle button
            darkModeToggle.addEventListener('click', () => {
                console.log('working')
                if (body.classList.contains('dark-mode')) {
                    disableDarkMode();
                } else {
                    enableDarkMode();
                }
            });
        
            // Function to enable dark mode
            function enableDarkMode() {
                body.classList.add('dark-mode');
                localStorage.setItem('dark-mode', 'enabled'); // Save the preference in localStorage
            }
        
            // Function to disable dark mode
            function disableDarkMode() {
                body.classList.remove('dark-mode');
                localStorage.setItem('dark-mode', 'disabled'); // Save the preference in localStorage
            }

        })
        .catch(error => console.error('Error loading navbar:', error));
});
