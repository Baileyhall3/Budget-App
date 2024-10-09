function getLast7Days() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let last7Days = [];

    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        last7Days.push(daysOfWeek[date.getDay()]);
    }

    return last7Days;
}

function toggleDropdown(dropdownId) {
    document.querySelectorAll('.dropdown-content').forEach(function (dropdown) {
        if (dropdown.id !== dropdownId) {
            dropdown.style.display = 'none';
        }
    });

    // Toggle the selected dropdown
    const dropdown = document.getElementById(dropdownId);
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Set the start and end dates of the budget period
    const startDate = new Date('2024-09-15');
    const endDate = new Date('2024-10-15');
    const today = new Date();

    // Calculate the total number of days in the budget period
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Calculate the number of days from the start date to today
    const daysSinceStart = (today - startDate) / (1000 * 60 * 60 * 24);

    // Calculate the percentage of the period passed
    const percentageThroughPeriod = (daysSinceStart / totalDays) * 100;

    // Get the today-marker element and set its position
    const todayMarker = document.getElementById('today-marker');
    if(todayMarker) {
        todayMarker.style.left = `${percentageThroughPeriod}%`;
    }
})
