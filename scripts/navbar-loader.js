document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            var currentPath = window.location.pathname;

            var homeLink = document.getElementById("home-link");
            var aboutLink = document.getElementById("pots-link");
            var artistsLink = document.getElementById("budgets-link");

            // Determine which link should be active based on the current page
            if (currentPath.includes("index.html")) {
                homeLink.classList.add("active");
            } else if (currentPath.includes("pots.html")) {
                aboutLink.classList.add("active");
            } else if (currentPath.includes("budgets.html")) {
                artistsLink.classList.add("active");
            } 

            // var hamburger = document.getElementById("hamburger");
            var navMenu = document.getElementById("nav-menu");
            // var wrapper = document.getElementById("wrapper");
            // var dropdown = document.getElementById("dropdown-menu");

            // hamburger.addEventListener("click", function (event) {
            //     event.stopPropagation(); // Stops default click behaviour
            //     navMenu.classList.toggle("show");
            // });
            
            window.addEventListener("click", function () {
                if (navMenu.classList.contains("show")) {
                    navMenu.classList.remove("show");
                }
            });
            
            navMenu.addEventListener("click", function(event) {
                event.stopPropagation();
            });

        })
        .catch(error => console.error('Error loading navbar:', error));
    
});
