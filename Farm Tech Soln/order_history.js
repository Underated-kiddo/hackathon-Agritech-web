window.onload = function() {
    fetch('/api/orders/history/')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('orderHistoryList');
            if (Array.isArray(data)) {
                list.innerHTML = data.length ? data.map(order => `
                    <li>
                        Order #${order.id}: ${order.product} x${order.quantity} - <b>${order.status}</b>
                        ${order.status === 'Pending' ? `<button onclick="cancelOrder(${order.id})">Cancel</button>` : ''}
                        ${order.status === 'Delivered' ? '' : `<button onclick="markDelivered(${order.id})">Mark as Delivered</button>`}
                    </li>
                `).join('') : '<li>No orders found.</li>';
            } else {
                list.innerHTML = '<li>No orders found.</li>';
            }
        })
        .catch(() => {
            document.getElementById('orderHistoryList').innerHTML = '<li>Failed to load order history.</li>';
        });
};

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        fetch(`/api/orders/${orderId}/cancel/`, { method: 'POST' })
            .then(res => {
                if (res.ok) {
                    document.getElementById('orderActionsMsg').textContent = 'Order cancelled.';
                    setTimeout(() => location.reload(), 1000);
                } else {
                    document.getElementById('orderActionsMsg').textContent = 'Failed to cancel order.';
                }
            })
            .catch(() => {
                document.getElementById('orderActionsMsg').textContent = 'Network error.';
            });
    }
}

function markDelivered(orderId) {
    fetch(`/api/orders/${orderId}/deliver/`, { method: 'POST' })
        .then(res => {
            if (res.ok) {
                document.getElementById('orderActionsMsg').textContent = 'Order marked as delivered.';
                setTimeout(() => location.reload(), 1000);
            } else {
                document.getElementById('orderActionsMsg').textContent = 'Failed to update order.';
            }
        })
        .catch(() => {
            document.getElementById('orderActionsMsg').textContent = 'Network error.';
        });
}
