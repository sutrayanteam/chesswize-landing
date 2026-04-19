# ChessWize Lead-API Worker

Cloudflare Worker that accepts demo-booking form submissions from
`chesswize.in`, pushes them to Zoho CRM (Leads module), and emails the
counsellor via Resend.

## Routes

| Method | Path             | What it does                                               |
|--------|------------------|------------------------------------------------------------|
| POST   | `/api/leads`     | Accept a lead, push to Zoho CRM + send email notification  |
| GET    | `/api/health`    | Report which integrations are configured                   |

Runs on routes `chesswize.in/api/*` and `www.chesswize.in/api/*` — no CORS
needed for the landing page since it's same-origin.

## Setup — one-time

### 1. Install wrangler + log in

```sh
cd worker
npm install
npx wrangler login
```

### 2. Zoho CRM Self-Client → get credentials

1. Sign up at <https://www.zoho.com/crm/> (pick India DC if your business is in India).
2. Go to <https://api-console.zoho.com/> and create a **Self-Client**.
3. Copy the **Client ID** and **Client Secret**.
4. In the Self-Client "Generate Code" tab, set scope to
   `ZohoCRM.modules.leads.CREATE,ZohoCRM.modules.leads.READ` and
   time-limit `10 minutes`. Copy the one-time **grant token**.
5. Exchange it for a refresh token:

   ```sh
   curl -X POST "https://accounts.zoho.in/oauth/v2/token" \
     -d "grant_type=authorization_code" \
     -d "client_id=<YOUR_CLIENT_ID>" \
     -d "client_secret=<YOUR_CLIENT_SECRET>" \
     -d "code=<GRANT_TOKEN>"
   ```

   Save the `refresh_token` from the response. It doesn't expire unless revoked.

### 3. Resend API key

1. Sign up at <https://resend.com/>.
2. Verify `chesswize.in` as a sending domain (adds DNS records — I can wire those via Cloudflare API once you give me the TXT values).
3. Go to <https://resend.com/api-keys> → create an API key.

### 4. Set secrets in Cloudflare

```sh
cd worker

npx wrangler secret put ZOHO_CLIENT_ID          # paste
npx wrangler secret put ZOHO_CLIENT_SECRET      # paste
npx wrangler secret put ZOHO_REFRESH_TOKEN      # paste
npx wrangler secret put ZOHO_ACCOUNTS_URL       # https://accounts.zoho.in
npx wrangler secret put ZOHO_API_DOMAIN         # https://www.zohoapis.in

npx wrangler secret put RESEND_API_KEY          # paste
```

(`FROM_EMAIL`, `NOTIFY_EMAIL`, `ALLOWED_ORIGINS` are in `wrangler.toml` — edit there.)

### 5. Deploy

```sh
npx wrangler deploy
```

The worker goes live at `https://chesswize.in/api/*`. Test:

```sh
curl https://chesswize.in/api/health
```

Should return `{"ok":true,"service":"chesswize-lead-api","integrations":{...}}`.

## Behaviour when env vars are missing

The worker **won't fail**. It reports which integrations are wired via
`/api/health` and the frontend's WhatsApp fallback still works for end-users.
You can ship the worker before secrets are set and just add them later.

## Local dev

```sh
cd worker
cp ../worker/.dev.vars.example .dev.vars  # fill in values
npx wrangler dev
```

Then hit <http://localhost:8787/api/health>.
