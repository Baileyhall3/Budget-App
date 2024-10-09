// Generic function to open a modal by ID
function openModal(modalId) {
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
