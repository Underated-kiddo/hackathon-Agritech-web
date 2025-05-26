# Farm Tech Platform

**Status:** 🚧 Project in Progress (Not Yet Complete)

## Overview
Farm Tech Platform is a modern, full-stack web application designed to connect farmers, buyers, local markets, and administrators. It provides role-based dashboards, product management, analytics, order tracking, reviews, notifications, and more—all with a focus on accessibility, modern UX, and future scalability.

## Features
- Role-based dashboards for Farmers, Buyers/Local Market, and Admin
- Product management (add, edit, delete, image upload)
- Order management and tracking
- Reviews and ratings
- Real-time notifications
- Analytics dashboard with filters
- Global dark mode and accessibility support
- Admin tools for monitoring, reports, and user management

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Django (Python), MySQL (in progress)
- **APIs:** RESTful endpoints (to be implemented)

## Project Structure
- `Farm Tech Soln/` — Frontend source code (HTML, CSS, JS)
- `farmtech_backend/` — Django backend (models, migrations, settings, etc.)

## Setup (Frontend)
1. Open `Farm Tech Soln/` in your browser or with Live Server.
2. Use the role-based dashboards for different user experiences.

## Setup (Backend)
1. Install Python 3.8+, Django, Django REST Framework, and MySQL client.
2. Configure MySQL in `farmtech_backend/settings.py`.
3. Run migrations: `python manage.py makemigrations && python manage.py migrate`
4. Start the server: `python manage.py runserver`

## To Do / In Progress
- Implement Django REST API endpoints for all features
- Connect frontend to backend APIs
- Complete admin features and reporting
- Add production deployment configuration

## Contributing
Contributions are welcome! Please open an issue or pull request.

## License
[MIT License](LICENSE)
