# Swiftly

A full-stack freelancing platform connecting clients with professionals, built with Laravel (API backend) and React (frontend).



## Features

### Core Functionality
- ✅ User authentication (Freelancers & Clients)
- ✅ Profile management with portfolio uploads
- ✅ Job posting and bidding system
- ✅ Real-time messaging
- ✅ Payment gateway integration
- ✅ Rating and review system

### For Freelancers
- ✨ Skills-based profile creation
- ✨ Job search with filters
- ✨ Proposal submission
- ✨ Work dashboard
- ✨ Earnings tracking

### For Clients
- ✨ Project posting wizard
- ✨ Freelancer discovery
- ✨ Proposal management
- ✨ Milestone payments
- ✨ Project collaboration tools

## Tech Stack

### Frontend
- React 18
- Redux Toolkit (State management)
- React Router 6 (Routing)
- Axios (API requests)
- Tailwind CSS (Styling)
- React Hook Form (Forms)
- Socket.IO (Real-time features)

### Backend
- Laravel 12
- Laravel Sanctum (API Authentication)
- MySQL (Database)
- Redis (Caching & Queue)
- Laravel Horizon (Queue monitoring)
- Laravel Telescope (Debugging)
- Stripe/PayPal (Payments)

## Installation

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer 2+
- MySQL 8+
- Redis 6+

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PeinNotFound/swiftly_demo.git
   cd swiftly_demo/backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Update `.env` with your database credentials and other settings.

5. Run migrations:
   ```bash
   php artisan migrate --seed
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
   Update the API base URL in `.env.local`

## Running the Application

### Development
1. Start Laravel backend:
   ```bash
   cd ../backend
   php artisan serve
   ```

2. Start React frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Access the app at `http://localhost:3000`

### Production
1. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Configure Laravel to serve the frontend (update `routes/web.php`)

## Project Structure

```
swiftly-beta/
├── backend/               # Laravel API
│   ├── app/              # Application code
│   ├── config/           # Configuration files
│   ├── database/         # Migrations and seeds
│   └── routes/           # API endpoints
│
├── frontend/             # React application
│   ├── public/           # Static assets
│   └── src/              # Source code
│       ├── api/          # API services
│       ├── components/   # Reusable UI
│       ├── features/     # Feature modules
│       ├── store/        # Redux configuration
│       └── utils/        # Helper functions
│
└── docs/                 # Documentation
```


## Testing

Run PHPUnit tests:
```bash
php artisan test
```

Run frontend tests:
```bash
cd frontend
npm test
```

