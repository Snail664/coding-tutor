# Self-hosted Piston

The public Piston API (`emkc.org`) is no longer freely available, so this app
runs its own [Piston](https://github.com/engineer-man/piston) instance for
code execution. The Next.js API route at
[`app/api/execute-code/route.ts`](../app/api/execute-code/route.ts) calls
`PISTON_API_URL` instead of `emkc.org`.

## Local development

1. Start Piston:
   ```bash
   cd piston
   docker compose up -d
   ```
2. Install the language packages you need (one-time; persisted in
   `piston/data/`):
   ```bash
   curl -X POST http://localhost:2000/api/v2/packages \
     -H "Content-Type: application/json" \
     -d '{"language":"python","version":"3.10.0"}'

   curl -X POST http://localhost:2000/api/v2/packages \
     -H "Content-Type: application/json" \
     -d '{"language":"gcc","version":"10.2.0"}'
   ```
3. In your `.env` (root of repo), set:
   ```
   PISTON_API_URL="http://localhost:2000"
   ```
4. Run the app as usual (`npm run dev`). The execute-code route will call
   your local Piston instance.

Verify directly with:
```bash
curl -X POST http://localhost:2000/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","version":"3.10.0","files":[{"name":"script","content":"print(1+1)"}]}'
```

## Production (Fly.io)

See [`fly.toml`](./fly.toml) for the app config and deploy steps. In short:

```bash
cd piston
fly auth login
fly launch --no-deploy --copy-config --name <your-piston-app-name>
fly volumes create piston_data --size 1 --region <region>
fly deploy
```

Then install the same language packages against the deployed URL
(`https://<your-piston-app-name>.fly.dev`), and set `PISTON_API_URL` to that
URL in your Vercel project's Environment Variables (Production + Preview),
then redeploy.
