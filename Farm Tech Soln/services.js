// Handles button actions on services.html

document.addEventListener('DOMContentLoaded', function() {
    // Farmer's Services nav
    const farmerServicesBtn = document.getElementById('farmerServicesBtn');
    if (farmerServicesBtn) {
        farmerServicesBtn.onclick = function(e) {
            e.preventDefault();
            alert('Redirecting to Farmer Dashboard...');
            window.location.href = 'home.html';
        };
    }
    // Buyer/Market Services nav
    const buyerServicesBtn = document.getElementById('buyerServicesBtn');
    if (buyerServicesBtn) {
        buyerServicesBtn.onclick = function(e) {
            e.preventDefault();
            alert('Redirecting to Buyer/Market Dashboard...');
            window.location.href = 'home.html';
        };
    }
    // Add Product (for farmers)
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.onclick = function() {
            window.location.href = 'add_product.html';
        };
    }
    // Farmer Order (go to delivery)
    const farmerOrderBtn = document.getElementById('farmerOrderBtn');
    if (farmerOrderBtn) {
        farmerOrderBtn.onclick = function() {
            window.location.href = 'delivery.html';
        };
    }
    // Buyer Order (go to delivery)
    const buyerOrderBtn = document.getElementById('buyerOrderBtn');
    if (buyerOrderBtn) {
        buyerOrderBtn.onclick = function() {
            window.location.href = 'delivery.html';
        };
    }
    // Product reviews
    const productReviews = document.getElementById('productReviews');
    if (productReviews) {
        fetch('/api/reviews/')
            .then(res => res.json())
            .then(data => {
                productReviews.innerHTML = data.length ? data.map(r => `
                    <div style="margin-bottom:1em;">
                        <b>${r.product}</b><br>
                        <span>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span> <i>"${r.comment}"</i> - <a href="#" style="color:blue;">${r.user}</a>
                    </div>
                `).join('') : '<div>No reviews yet.</div>';
            })
            .catch(() => {
                productReviews.innerHTML = '<div>Failed to load reviews.</div>';
            });
    }
    // Display market prices from price_updates.json
    fetch('price_updates.json')
        .then(response => response.json())
        .then(data => {
            const marketPrices = document.getElementById('marketPrices');
            if (marketPrices) {
                let html = '<h4>Current Market Prices (KES)</h4>';
                html += '<table style="width:100%;border-collapse:collapse;text-align:center;background:white;border-radius:1em;box-shadow:0 0 8px gray;">';
                html += '<tr><th>Location</th><th>Maize</th><th>Beans</th><th>Tomatoes</th><th>Potatoes</th></tr>';
                for (const loc in data) {
                    html += `<tr><td><b>${loc}</b></td><td>${data[loc]['Maize']}</td><td>${data[loc]['Beans']}</td><td>${data[loc]['Tomatoes']}</td><td>${data[loc]['Potatoes']}</td></tr>`;
                }
                html += '</table>';
                marketPrices.innerHTML = html;
            }
        });
    // My Products management (for farmers)
    const myProducts = document.getElementById('myProducts');
    if (myProducts) {
        fetch('/api/my_products/')
            .then(res => res.json())
            .then(data => {
                myProducts.innerHTML = data.length ? data.map(p => `
                    <div style="background:white;padding:1em;margin-bottom:1em;border-radius:1em;box-shadow:0 0 8px gray;">
                        <b>${p.name}</b> (${p.category})<br>
                        <img src="${p.image_url || '#'}" alt="${p.name}" style="max-width:100px;max-height:100px;display:block;margin:0.5em 0;">
                        Price: ${p.price} KES<br>
                        Quantity: ${p.quantity}<br>
                        <button onclick="editProduct(${p.id})">Edit</button>
                        <button onclick="deleteProduct(${p.id})">Delete</button>
                    </div>
                `).join('') : '<div>No products found.</div>';
            })
            .catch(() => {
                myProducts.innerHTML = '<div>Failed to load products.</div>';
            });
    }
    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.onsubmit = async function(e) {
            e.preventDefault();
            const product = document.getElementById('reviewProduct').value;
            const rating = document.getElementById('reviewRating').value;
            const comment = document.getElementById('reviewComment').value;
            const msg = document.getElementById('reviewMsg');
            try {
                const res = await fetch('/api/reviews/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product, rating, comment })
                });
                if (res.ok) {
                    msg.textContent = 'Review submitted!';
                    reviewForm.reset();
                } else {
                    msg.textContent = 'Failed to submit review.';
                }
            } catch (err) {
                msg.textContent = 'Network error.';
            }
        };
    }
    // Analytics filter form
    const analyticsFilterForm = document.getElementById('analyticsFilterForm');
    if (analyticsFilterForm) {
        analyticsFilterForm.onsubmit = async function(e) {
            e.preventDefault();
            const date = document.getElementById('analyticsDate').value;
            const product = document.getElementById('analyticsProduct').value;
            const location = document.getElementById('analyticsLocation').value;
            // Fetch filtered analytics data from backend
            try {
                const params = new URLSearchParams();
                if (date) params.append('date', date);
                if (product) params.append('product', product);
                if (location) params.append('location', location);
                const res = await fetch('/api/analytics/?' + params.toString());
                const data = await res.json();
                // TODO: Update analytics charts/images with new data
                alert('Analytics updated (demo).');
            } catch (err) {
                alert('Failed to fetch analytics.');
            }
        };
    }
});

// Edit and delete product handlers (to be implemented with modals or forms)
function editProduct(productId) {
    alert('Edit product feature coming soon.');
}
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${productId}/`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    location.reload();
                } else {
                    alert('Failed to delete product.');
                }
            })
            .catch(() => alert('Network error.'));
    }
}