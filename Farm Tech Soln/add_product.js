// Handles adding a product
document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    const msg = document.getElementById('addProductMsg');
    try {
        const res = await fetch('/api/products/', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            msg.textContent = 'Product added!';
            form.reset();
        } else {
            msg.textContent = 'Failed to add product.';
        }
    } catch (err) {
        msg.textContent = 'Network error.';
    }
});
