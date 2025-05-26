window.onload = function() {
    function loadNotifications() {
        fetch('/api/notifications/')
            .then(res => res.json())
            .then(data => {
                const list = document.getElementById('notificationsList');
                if (Array.isArray(data)) {
                    list.innerHTML = data.length ? data.map(note => `<li>${note.message}</li>`).join('') : '<li>No notifications.</li>';
                } else {
                    list.innerHTML = '<li>No notifications.</li>';
                }
            })
            .catch(() => {
                document.getElementById('notificationsList').innerHTML = '<li>Failed to load notifications.</li>';
            });
    }
    loadNotifications();
    setInterval(loadNotifications, 30000); // Poll every 30 seconds
};
