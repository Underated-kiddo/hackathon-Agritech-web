document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const role = document.getElementById('signupRole')?.value;
        const username = document.querySelector('input[placeholder="Spongebob"]')?.value || '';
        const password = document.querySelector('input[type="Password"]')?.value || '';
        // Collect other fields as needed
        if (role && username && password) {
            try {
                const res = await fetch('/api/signup/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, role })
                });
                if (res.ok) {
                    window.location.href = 'login.html';
                } else {
                    alert('Sign-up failed. Please try again.');
                }
            } catch (err) {
                alert('Network error. Please try again.');
            }
        } else {
            alert('Please fill all required fields.');
        }
    });
});