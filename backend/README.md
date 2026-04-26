# Backend API

Express + TypeScript API server with Redis storage.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the backend directory:
```bash
REDIS_URL=your_redis_connection_string
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run check-types` - TypeScript type checking

## API Endpoints

- `GET /lotteries` - Get all lotteries
- `POST /lotteries` - Create a new lottery
- `GET /lottery/:id` - Get lottery by ID
- `POST /register` - Register participant for lottery
