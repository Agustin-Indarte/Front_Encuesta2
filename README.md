# Front_Encuesta2

Front_Encuesta2 es la interfaz web para la plataforma de encuestas desarrollada con React y Vite. Permite a administradores crear y gestionar encuestas y a usuarios responder y visualizar resultados con gráficos interactivos.

## Resumen rápido
- **Framework:** React + Vite
- **UI:** Bootstrap / React-Bootstrap
- **Gráficas:** Chart.js (react-chartjs-2)
- **Comunicación:** Axios con tokens JWT en localStorage

## Quick Start (desarrollo)
1. **Clonar:**
   ```bash
   git clone https://github.com/Agustin-Indarte/Front_Encuesta2.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar (opcional) la URL del backend en `.env`:**
   ```env
   VITE_API_BASE_URL=https://back-encuesta2.onrender.com/api/v1
   ```
   *(si no se define, la app usa la URL por defecto en apiConfig)*
4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

## Scripts disponibles
- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — crear bundle de producción
- `npm run preview` — previsualizar build
- `npm run lint` — ejecutar ESLint

## Variables de entorno recomendadas
- **VITE_API_BASE_URL:** URL base del API (ej. `https://back-encuesta2.onrender.com/api/v1`)
  > Nota: En Vite, las variables deben empezar con `VITE_` para estar disponibles en el cliente.

## Estructura del proyecto (resumen)
```
src/
- api/              Configuración y clientes Axios
- components/       Componentes reutilizables
- context/          Contextos (Auth, Encuestas)
- pages/            Páginas principales
- services/         Servicios (auth, encuestas)
- App.jsx, main.jsx, index.css
```

## Rutas principales
**Públicas:**
- `/`, `/register` — Registro
- `/login` — Inicio de sesión
- `/recuperar` — Recuperación
- `/reset-password` — Reseteo
- `/verify-email` — Verificación

**Administrador:**
- `/admin/home`
- `/admin/encuestas`
- `/admin-respuestas`

**Usuario:**
- `/user/home`
- `/user/encuestas`

## Conexión con backend y autenticación
- El cliente usa Axios con un interceptor que añade `Authorization: Bearer <token>` tomando el token de localStorage (clave: `authToken`).
- Endpoint por defecto: `https://back-encuesta2.onrender.com/api/v1` (se recomienda configurar `VITE_API_BASE_URL`).

## Dependencias clave
- `react`, `react-dom`, `react-router-dom`
- `bootstrap`, `react-bootstrap`
- `axios`, `react-hook-form`
- `chart.js`, `react-chartjs-2`
- `styled-components`
- `react-hot-toast`

## Buenas prácticas y notas
- Mantener tokens seguros y expirar sesiones según el backend.
- Ejecutar `npm run lint` antes de commits.
- Para producción, revisar la variable `VITE_API_BASE_URL` y ejecutar `npm run build`.

## Autores
Indarte Agustin, Sosa Martin, Garcia Sebastian, Alvarez Jose, Caria Maria, Olivera Santiago
