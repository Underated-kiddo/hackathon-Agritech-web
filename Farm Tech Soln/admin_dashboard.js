// Role-based access control for admin dashboard (DISABLED TEMPORARILY)
/*
(async function() {
    let role = localStorage.getItem('role');
    if (!role) {
        window.location.href = 'login.html';
        return;
    }
    if (role !== 'admin') {
        // Not an admin, redirect to correct dashboard
        if (role === 'farmer') {
            window.location.href = 'farmers_dashboard.html';
        } else if (role === 'buyer' || role === 'local_market') {
            window.location.href = 'buyers_dashboard.html';
        } else {
            window.location.href = 'login.html';
        }
    }
})();
*/
// Placeholder: fetch and render user reviews, reports, and monitoring data for admin
