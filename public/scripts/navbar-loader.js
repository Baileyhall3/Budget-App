document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            // JavaScript to highlight the active link based on current page
            const currentPath = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-menu a'); // Select all nav links

            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active'); // Add active class to the current page's link
                }
            });
            
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

    // New Account Modal
    // Get the modal
    const modal = document.getElementById("newAccountModal");

    // Get the 'Add Account' button inside the dropdown (with the correct ID)
    const addAccountLink = document.getElementById("addAccount");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // Get the account type and joining partner field
    const accountType = document.getElementById("accountType");
    const joiningPartner = document.getElementById("joiningPartner");

    // When the user clicks 'Add Account', open the modal 
    addAccountLink.onclick = function(event) {
        event.preventDefault(); // Prevent default action of <a> tag
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Enable/Disable Joining Partner based on Account Type
    accountType.addEventListener('change', function() {
        if (accountType.value === 'joint') {
            joiningPartner.disabled = false; // Enable if Joint is selected
        } else {
            joiningPartner.disabled = true; // Disable otherwise
            joiningPartner.value = ''; // Clear the input if disabled
        }
    });
});
