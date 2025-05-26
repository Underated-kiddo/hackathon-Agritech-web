// Fetch and display buyer requests from backend API
window.onload = function() {
    fetch('/api/buyer_requests/')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('buyerRequestsList');
            if (Array.isArray(data)) {
                list.innerHTML = data.length ? data.map(req => `<li>${req.product} - ${req.quantity} needed</li>`).join('') : '<li>No requests found.</li>';
            } else {
                list.innerHTML = '<li>No requests found.</li>';
            }
        })
        .catch(() => {
            document.getElementById('buyerRequestsList').innerHTML = '<li>Failed to load requests.</li>';
        });
};
