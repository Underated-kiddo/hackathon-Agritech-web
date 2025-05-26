document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const role = document.getElementById('loginRole')?.value;
        const username = document.querySelector('input[placeholder="Spongebob"]')?.value || '';
        const password = document.querySelector('input[type="Password"]')?.value || '';
        if (role && username && password) {
            try {
                const res = await fetch('/api/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, role })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.role === 'farmer') {
                        window.location.href = 'farmers_dashboard.html';
                    } else if (data.role === 'buyer' || data.role === 'local_market') {
                        window.location.href = 'buyers_dashboard.html';
                    } else {
                        alert('Unknown user role.');
                    }
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (err) {
                alert('Network error. Please try again.');
            }
        } else {
            alert('Please fill all required fields.');
        }
    });
});