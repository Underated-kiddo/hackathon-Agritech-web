document.addEventListener('DOMContentLoaded', async function() {
    let userRole = null;
    let farmerName = null;
    try {
        const res = await fetch('/api/user/');
        if (res.ok) {
            const user = await res.json();
            userRole = user.role;
            farmerName = user.farmerName;
        }
    } catch (err) {
        // Not logged in or error
    }
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const topbar = document.querySelector('.topbar');
    if (!userRole) {
        if (topbar) topbar.innerHTML = '<div>Farm Tech Soln</div><div>User: Guest</div>';
        if (sidebar) sidebar.innerHTML = `
            <a href="#">Home</a>
            <a href="services.html">Services</a>
            <a href="settings.html">Settings</a>
            <a href="profile.html">Profile</a>
            <a href="order_history.html">Order History</a>
            <a href="notifications.html">Notifications</a>
            <a href="faq.html">FAQ</a>
            <a href="About Us.html">About us</a>
            <a href="#">Logout</a>
        `;
        if (content) content.innerHTML = `
            <h1>Welcome to your dashboard</h1>
            <p>This is Farm Tech Soln your solution to everyday farm and market problems<br>
            You are not well vast well dont worry we have your back.</p>
        `;
        return;
    }
    if (userRole === 'farmer') {
        const displayName = farmerName ? farmerName : 'Farmer';
        if (topbar) topbar.innerHTML = `<div>Farm Tech Soln</div><div>User: ${displayName}</div>`;
        if (sidebar) sidebar.innerHTML = `
            <a href="home.html">Home</a>
            <a href="add_product.html">Add Product</a>
            <a href="buyer_requests.html">Buyer Requests</a>
            <a href="services.html">Farming Tips</a>
            <a href="settings.html">Settings</a>
            <a href="profile.html">Profile</a>
            <a href="order_history.html">Order History</a>
            <a href="notifications.html">Notifications</a>
            <a href="faq.html">FAQ</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;
        if (content) content.innerHTML = `
            <h1>Welcome, ${displayName}!</h1>
            <ul>
                <li><a href="add_product.html">Add a new product for sale</a></li>
                <li><a href="buyer_requests.html">See what buyers want</a></li>
                <li><a href="services.html">Get farming tips</a></li>
            </ul>
        `;
    } else {
        if (topbar) topbar.innerHTML = '<div>Farm Tech Soln</div><div>User: Buyer/Market</div>';
        if (sidebar) sidebar.innerHTML = `
            <a href="home.html">Home</a>
            <a href="search_products.html">Search Products</a>
            <a href="services.html">Services</a>
            <a href="settings.html">Settings</a>
            <a href="profile.html">Profile</a>
            <a href="order_history.html">Order History</a>
            <a href="notifications.html">Notifications</a>
            <a href="faq.html">FAQ</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;
        if (content) content.innerHTML = `
            <h1>Welcome, Buyer/Local Market!</h1>
            <ul>
                <li><a href="search_products.html">Search and buy products from farmers</a></li>
            </ul>
        `;
    }
    setTimeout(() => {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = async function() {
                await fetch('/api/logout/', { method: 'POST' });
                window.location.href = 'login.html';
            };
        }
    }, 100);
});