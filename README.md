# order-service

Small Express API that prices customer orders for the storefront.

## Requirements

- Node.js 20 or newer

## Local setup

```bash
npm ci
npm test
npm start
```

## Endpoints

- `GET /health` – service health check
- `GET /orders` – list orders, newest first
- `POST /orders/quote` – price a basket of items
