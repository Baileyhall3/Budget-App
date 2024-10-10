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