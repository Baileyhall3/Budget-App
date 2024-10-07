document.addEventListener("DOMContentLoaded", function () {
    // New Account Modal
    const newAccountModal = document.getElementById("newAccountModal");
    const addAccountLink = document.getElementById("addAccount");

    // New Pot Modal
    const newPotModal = document.getElementById("newPotModal");
    const addPotLink = document.getElementById("addPot");

    // New Budget Modal
    const newBudgetModal = document.getElementById("newBudgetModal");
    const addBudgetLink = document.getElementById("addBudget");

    // Handle the add account button click
    if (addAccountLink) {
        addAccountLink.onclick = function (event) {
            event.preventDefault();
            newAccountModal.style.display = "block";
        };
    }

    // Handle the add pot button click
    if (addPotLink) {
        addPotLink.onclick = function (event) {
            event.preventDefault();
            newPotModal.style.display = "block";
        };
    }

    // Handle the add pot button click
    if (addBudgetLink) {
        addBudgetLink.onclick = function (event) {
            event.preventDefault();
            newBudgetModal.style.display = "block";
        };
    }

    // Handle account type change
    const accountType = document.getElementById("accountType");
    const joiningPartner = document.getElementById("joiningPartner");
    if (accountType) {
        accountType.addEventListener("change", function () {
            if (accountType.value === "joint") {
                joiningPartner.disabled = false;
            } else {
                joiningPartner.disabled = true;
                joiningPartner.value = ""; // Clear the input if disabled
            }
        });
    }

    // Close modals when clicking the close button or clicking outside
    const closeButtons = document.querySelectorAll(".close");

    // Loop through close buttons to attach close functionality to each modal
    closeButtons.forEach(function (closeBtn) {
        closeBtn.onclick = function () {
            closeBtn.closest(".modal").style.display = "none";
        };
    });

    // Close modal when clicking outside of any modal
    window.onclick = function (event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    };
});
