// Profile page logic: Save and load profile info
window.onload = function() {
    const nameInput = document.getElementById('profileName');
    const contactInput = document.getElementById('profileContact');
    const msg = document.getElementById('profileMsg');
    // Load from backend
    fetch('/api/user/profile/')
        .then(res => res.json())
        .then(data => {
            nameInput.value = data.name || '';
            contactInput.value = data.contact || '';
        });
    document.getElementById('profileForm').onsubmit = async function(e) {
        e.preventDefault();
        const payload = {
            name: nameInput.value,
            contact: contactInput.value
        };
        try {
            const res = await fetch('/api/user/profile/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                msg.textContent = 'Profile updated!';
            } else {
                msg.textContent = 'Failed to update profile.';
            }
        } catch (err) {
            msg.textContent = 'Network error.';
        }
    };
};
