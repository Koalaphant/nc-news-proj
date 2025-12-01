# NC News (Frontend)

React + Vite single-page client for the NC News API. Explore curated articles, drill into individual stories, sort/filter by topic, and participate in discussion threads with inline voting and commenting.

Live site: https://nc-news.duckpixel.com  
Backend repo: https://github.com/Koalaphant/nc-news

---

## Features

- **Responsive navigation & theming** – mobile-friendly header with hamburger menu and contextual login indicator.
- **Home feed** – highlights the nine most recent articles with hero imagery, vote counts, and truncated previews.
- **Topic browsing** – `/topics` lists every topic returned by the API; clicking a tile filters articles via the corresponding dynamic route.
- **Article directory** – `/articles` supports topic filtering, client-side sorting (created date, votes, comment count), and order toggles.
- **Single article view** – immersive hero layout, optimistic vote buttons, and graceful 404 handling when an article is missing.
- **Comments experience** – fetch, post, and delete comments inline. Only the author sees the delete option; all submissions surface success/error alerts.
- **User picker** – `/users` lists API users with avatars and lets you "log in" by selecting one, updating the global `UserContext` used when commenting.
- **Utility helpers** – date formatting and body preview helpers keep UI logic tidy and consistent.

## Tech Stack

- [React 18](https://react.dev/) with hooks and context
- [Vite 5](https://vitejs.dev/) dev server & bundler
- [React Router 6](https://reactrouter.com/) for client-side routing
- [Axios](https://axios-http.com/) for data access
- Vanilla CSS modules per feature folder
- Docker + Nginx (optional) for production serving

## Prerequisites

- Node.js ≥ 18 (Vite 5 requirement)
- npm ≥ 9
- An accessible NC News API instance (hosted repository linked above)

## Quick Start

```bash
git clone https://github.com/Koalaphant/nc-news-proj.git
cd nc-news-proj

cp .env.example .env   # create this file if it does not yet exist
echo "VITE_API_BASE_URL=https://your-api.example.com/api" >> .env

npm install
npm run dev
```

Visit the printed Vite URL (defaults to http://localhost:5173) to browse the app locally.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | ✅ | Base URL for the NC News API (e.g. `https://nc-news-nxya.onrender.com/api`). Vite inlines this value at build time, so rebuild whenever it changes. |

> **Tip:** Keep `.env` out of version control (already handled in `.gitignore`). Share values securely with collaborators.

## npm Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Launches the Vite dev server with hot module replacement. |
| `npm run build` | Produces a production build in `dist/`. |
| `npm run preview` | Serves the production build locally for smoke testing. |
| `npm run lint` | Runs ESLint across `.js`/`.jsx` files. |

## Production Builds

### Manual build

```bash
VITE_API_BASE_URL=https://your-api.example.com/api npm run build
```

Deploy the generated `dist/` folder to any static host (Netlify, Vercel, S3, etc.).

### Docker workflow

The repo ships with a multi-stage `Dockerfile` that builds the Vite bundle and serves it with Nginx.

```bash
# Build (inject the API base URL at build time)
docker build \
  --build-arg VITE_API_BASE_URL="https://your-api.example.com/api" \
  -t nc-news-prod .

# Run (expose port 80 from the container to the host)
docker run -d --name nc-news-prod -p 80:80 nc-news-prod
```

Adjust the host port (`-p 3000:80`) if port 80 is already taken on your VPS.

## Project Layout

```
src/
├── AddComment/        # comment composer + styles
├── Articles/          # list view with sorting controls
├── Comments/          # threaded comments + delete logic
├── Contexts/          # React context for logged-in user
├── ErrorHandling/     # 404 page
├── Header/            # responsive navigation
├── HomeComponent/     # landing page feed
├── SingleArticle/     # article detail & votes
├── Topics/            # topic list/filtering links
├── Users/             # login picker
├── api.js             # Axios client + API helpers
├── utils.js           # reusable formatters
└── main.jsx / App.jsx # app bootstrap & routes
```

## Data Flow

- `src/api.js` centralizes Axios calls to articles, comments, topics, and users endpoints.
- `UserContext` provides the selected user throughout the tree; `Users` updates it, while `Header`, `AddComment`, and `Comments` consume it.
- `Articles`, `Home`, and `Topics` components reuse helper utilities for formatting and preview trimming for consistent output.
- Voting and commenting calls optimistically update UI state, then roll back with inline error messaging if the API fails.

## Contributing & Testing

1. Fork + clone the repo.
2. Install dependencies (`npm install`).
3. Ensure lint passes (`npm run lint`).
4. Add or update components alongside relevant CSS modules.

There is currently no automated test suite. If you add one (Jest, React Testing Library, etc.), document the workflow here.

---

Questions, deployment issues, or missing documentation? Open an issue or reach out so we can keep this README accurate.
