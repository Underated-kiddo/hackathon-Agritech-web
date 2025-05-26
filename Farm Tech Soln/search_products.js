document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    try {
        const res = await fetch('/api/products/?search=' + encodeURIComponent(query));
        const products = await res.json();
        document.getElementById('productResults').innerHTML = products.length
            ? products.map(p => `<li>${p.name} - ${p.price} KES (${p.quantity} available) <button>Buy</button></li>`).join('')
            : '<li>No products found.</li>';
    } catch (err) {
        document.getElementById('productResults').innerHTML = '<li>Failed to load products.</li>';
    }
});
