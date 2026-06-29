# OctoFit Frontend

This React 19 + Vite app uses `react-router-dom` and fetches API data from the backend service.

## Environment variable

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents invalid URLs such as `https://undefined-8000.app.github.dev`.
