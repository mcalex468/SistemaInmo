# Sistema Inmobiliario - Panel privado

Monorepo con frontend (Vue 3 + Vite) y backend (Node.js + Express) para gestionar clientes, solicitudes, citas e inmuebles con autenticación JWT y datos desde Airtable.

## Requisitos
- Node.js 18+
- Variables de entorno configuradas en `backend/.env` según `backend/.env.example`.

## Backend
```bash
cd backend
npm install
npm run dev
```
El servidor corre en `http://localhost:4000` (puerto configurable con `PORT`).

## Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite expone la app en `http://localhost:5173`. Configura `VITE_API_URL` si el backend usa otra URL.

## Credenciales demo
- Admin: `admin@demo.com` / `admin123`
- Agente: `agente@demo.com` / `agente123`

## Estructura
```
backend/
  src/
    app.js
    server.js
    routes/
    controllers/
    services/
    middleware/
    utils/
frontend/
  src/
    assets/
    components/
    views/
    router/
    stores/
    services/
    utils/
```
