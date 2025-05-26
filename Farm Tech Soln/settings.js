// Settings page logic: Save and load appearance/account type
window.onload = function() {
    const appearance = document.getElementById('appearance');
    const accountType = document.getElementById('accountType');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const notificationsToggle = document.getElementById('notificationsToggle');
    const msg = document.getElementById('settingsMsg');
    // Load from backend
    fetch('/api/user/settings/')
        .then(res => res.json())
        .then(data => {
            appearance.value = data.appearance || 'light';
            accountType.value = data.accountType || 'farmer';
            email.value = data.email || '';
            phone.value = data.phone || '';
            notificationsToggle.value = data.notificationsToggle || 'on';
        });
    document.getElementById('settingsForm').onsubmit = async function(e) {
        e.preventDefault();
        const payload = {
            appearance: appearance.value,
            accountType: accountType.value,
            email: email.value,
            phone: phone.value,
            notificationsToggle: notificationsToggle.value,
            password: password.value
        };
        try {
            const res = await fetch('/api/user/settings/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                msg.textContent = 'Settings updated! Reload the dashboard to see changes.';
            } else {
                msg.textContent = 'Failed to update settings.';
            }
        } catch (err) {
            msg.textContent = 'Network error.';
        }
    };
    // Password change logic
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.onsubmit = async function(e) {
            e.preventDefault();
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const msg = document.getElementById('changePasswordMsg');
            try {
                const res = await fetch('/api/user/change_password/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
                });
                if (res.ok) {
                    msg.textContent = 'Password changed successfully!';
                    changePasswordForm.reset();
                } else {
                    msg.textContent = 'Failed to change password.';
                }
            } catch (err) {
                msg.textContent = 'Network error.';
            }
        };
    }
    // Account deletion
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.onclick = async function() {
            if (confirm('Are you sure you want to request account deletion?')) {
                try {
                    const res = await fetch('/api/user/delete_account/', { method: 'POST' });
                    if (res.ok) {
                        alert('Account deletion requested.');
                        window.location.href = 'login.html';
                    } else {
                        alert('Failed to request account deletion.');
                    }
                } catch (err) {
                    alert('Network error.');
                }
            }
        };
    }
    // Data export
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.onclick = async function() {
            try {
                const res = await fetch('/api/user/export_data/');
                if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'my_farmtech_data.json';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } else {
                    alert('Failed to export data.');
                }
            } catch (err) {
                alert('Network error.');
            }
        };
    }
    // Appearance change (light/dark)
    function setAppearance() {
        if (appearance.value === 'dark') {
            document.body.style.background = 'black';
            document.body.style.color = 'white';
            document.querySelectorAll('.content, .sidebar, .topbar').forEach(function(el) {
                el && (el.style.background = 'black');
                el && (el.style.color = 'white');
            });
        } else {
            document.body.style.background = '';
            document.body.style.color = '';
            document.querySelectorAll('.content, .sidebar, .topbar').forEach(function(el) {
                el && (el.style.background = '');
                el && (el.style.color = '');
            });
        }
    }
    setAppearance();
    appearance.onchange = setAppearance;
};
