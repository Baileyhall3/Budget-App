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
