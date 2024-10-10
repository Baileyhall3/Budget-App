document.addEventListener("DOMContentLoaded", function () {
    // Get sidebar, divider, and content elements
    const sidebar = document.querySelector('.sidebar');
    const divider = document.querySelector('.divider');
    const content = document.querySelector('.content');

    // Variables to keep track of dragging state
    let isResizing = false;

    // Function to handle the mousedown event on the divider
    divider.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent text selection and other side effects
        isResizing = true;
        document.body.style.cursor = 'col-resize'; // Change cursor during resize
        document.body.style.userSelect = 'none'; // Disable text selection during drag
    });

    // Function to handle mousemove event when resizing
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const sidebarWidth = e.clientX; // Set sidebar width to the cursor's X position
        const minSidebarWidth = 200; // Minimum sidebar width
        const maxSidebarWidth = 500; // Maximum sidebar width

        // Clamp the sidebar width between min and max limits
        if (sidebarWidth >= minSidebarWidth && sidebarWidth <= maxSidebarWidth) {
            sidebar.style.width = `${sidebarWidth}px`; // Update sidebar width
            content.style.flexGrow = 1; // Ensure content fills the rest of the space
        }
    });

    // Function to handle mouseup event to stop resizing
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = ''; // Reset cursor
            document.body.style.userSelect = ''; // Enable text selection again
        }
    });
});
