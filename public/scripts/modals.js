// Generic function to open a modal by ID
function openModal(modalId) {
    // fetchUsers();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Generic function to close a modal by ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

const userList = [
    { name: "Lottie", added: "true" },
    { name: "Jayden", added: "true" },
    { name: "Craig", added: "true" },
    { name: "Liam", added: "true" },
    { name: "James", added: "true" },
    { name: "Lewis", added: "false" },
    { name: "Cain", added: "false" },
    { name: "Jake", added: "false" },
    { name: "Jacob", added: "false" },
];


// Function to display the list of users
function displayUsers(users) {
    const usersListContainer = document.getElementById('users-list');
    usersListContainer.innerHTML = ''; // Clear previous list

    users.forEach(user => {
        // Create a wrapper div for each user
        const userDiv = document.createElement('div');
        userDiv.classList.add('friend-row');
        userDiv.style = 'padding: 10px 0;'

        // Create the icon for the user
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-user', 'friend-icon');

        // Create the user name element
        const userName = document.createElement('span');
        userName.classList.add('friend-name');
        userName.textContent = user.name;

        // Create the action icon (check-square or plus-square)
        const actionIcon = document.createElement('i');
        actionIcon.classList.add('fa', user.added === "true" ? 'fa-check-square-o' : 'fa-plus-square-o', 'user-action-icon');
        actionIcon.style = 'font-size: 24px;'

        // Append the icon, name, and action icon to the user row
        userDiv.appendChild(icon);
        userDiv.appendChild(userName);
        userDiv.appendChild(actionIcon);

        // Append the user row to the container
        usersListContainer.appendChild(userDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to dynamically load HTML for modals
    function loadModals() {
        fetch('modals.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                attachCloseEvents(); // Attach close events after loading HTML
                initializeRecurringTransactionHandling(); // Initialize recurring transaction handling
                attachAccountFormEvents();
                displayUsers(userList);
            })
            .catch(err => console.log('Error loading modals:', err));
    }

    // Attach event listeners for closing modals
    function attachCloseEvents() {
        // Close modals when clicking the close button
        const closeButtons = document.querySelectorAll(".close");
        closeButtons.forEach(function (closeBtn) {
            closeBtn.onclick = function () {
                closeModal(closeBtn.closest(".modal").id);
            };
        });

        // Close modal when clicking outside of any modal
        window.onclick = function (event) {
            if (event.target.classList.contains("modal")) {
                event.target.style.display = "none";
            }
        };
    }

    // Function to initialize the recurring transaction form handling
    function initializeRecurringTransactionHandling() {
        // Grab the elements after the modal HTML is fully loaded
        const recurringIntervalSelect = document.getElementById('recurringInterval');
        const transactionDateInput = document.getElementById('transactionDate');
        const weeklySelect = document.getElementById('weeklySelect');
        const monthlySelect = document.getElementById('monthlySelect');

        // Check if the elements exist to avoid errors
        if (recurringIntervalSelect && transactionDateInput && weeklySelect && monthlySelect) {
            // Function to update the date input and select options based on interval selection
            function updateDateInput() {
                const selectedInterval = recurringIntervalSelect.value;

                // Reset the date input and hide all select options
                transactionDateInput.disabled = true;
                transactionDateInput.value = '';
                weeklySelect.style.display = 'none';
                monthlySelect.style.display = 'none';

                if (selectedInterval === 'daily') {
                    // Disable date input for daily
                    transactionDateInput.disabled = true;
                } else if (selectedInterval === 'weekly' || selectedInterval === 'biweekly') {
                    // Show weekly select and disable date input
                    weeklySelect.style.display = 'block';
                } else if (selectedInterval === 'monthly') {
                    // Show monthly select and disable date input
                    monthlySelect.style.display = 'block';
                }
            }

            // Add event listener for interval selection
            recurringIntervalSelect.addEventListener('change', updateDateInput);
        } else {
            console.log('Recurring transaction elements not found');
        }
    }

    // Load the modals and set up the close functionality
    loadModals();
});


function attachAccountFormEvents() {
    const accountForm = document.getElementById('newAccountForm');

    if (!accountForm) {
        console.error("Account form not found");
        return;
    }

    accountForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const accountName = document.getElementById('accountName').value;
        const defaultCurrency = document.getElementById('defaultCurrency').value;
        const accountType = document.getElementById('accountType').value;
        const defaultAccount = document.getElementById('defaultAccount').checked;

        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log('Token:', token); // This should log a valid token

        // Check if the token is null or undefined
        if (!token) {
            alert('No token found. Please log in.');
            return; // Exit if no token
        }

        try {
            const response = await fetch('/api/account/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Attach token here
                },
                body: JSON.stringify({ 
                    accountName, 
                    defaultCurrency, 
                    accountType, 
                    defaultAccount 
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account created successfully!');
                // Close the modal or refresh the UI
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating account:', error);
            alert('There was an error creating the account. Please try again.');
        }
    });

    document.getElementById('accountType').addEventListener('change', function() {
        const joiningPartnerInput = document.getElementById('joiningPartner');
        if (this.value === 'joint') {
            joiningPartnerInput.disabled = false; // Enable the field if 'Joint' is selected
            fetchUsers();
        } else {
            joiningPartnerInput.disabled = true;  // Disable it for other account types
            joiningPartnerInput.value = '';       // Clear the input if disabled
        }
    });

    async function fetchUsers() {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('No token found. User might not be authenticated.');
            return;
        }
    
        try {
            const response = await fetch('/api/account/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Log the response status for debugging
            console.log('Response status:', response.status);
            
            // Check if the response is okay
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Network response was not ok');
            }
    
            const users = await response.json();
            console.log('Fetched users:', users); // Check the structure of the users array
    
            // Check if users is an array
            if (!Array.isArray(users)) {
                throw new Error('Expected an array of users');
            }
    
            // Populate the dropdown
            const joiningPartnerSelect = document.getElementById('joiningPartner');
            joiningPartnerSelect.innerHTML = ''; // Clear existing options
            joiningPartnerSelect.disabled = false; // Enable the dropdown
    
            // Add users to the dropdown
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id; // User ID
                option.textContent = user.name; // Display name
                joiningPartnerSelect.appendChild(option);
            });
    
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }    
}

// Function to filter the users based on search input
function filterUsers() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = userList.filter(user => user.name.toLowerCase().includes(searchTerm));
        displayUsers(filteredUsers);
    }
}
