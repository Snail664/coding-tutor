
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
submitted for the NUS Guru Hackathon.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Getting Started

### Setting up the Environment Variables
Before running the project locally, you need to configure your environment variables.

### Step 1: Create a .env File
In the root of your project, create a file named `.env`.
Examples are present in the form of `.env.example`:
```bash
AUTH0_SECRET="your_auth0_secret_here"
AUTH0_BASE_URL="your_auth0_base_url_here"
AUTH0_ISSUER_BASE_URL="your_auth0_issuer_base_url_here"
AUTH0_CLIENT_ID="your_auth0_client_id_here"
AUTH0_CLIENT_SECRET="your_auth0_client_secret_here"
AUTH0_SCOPE="openid profile email"
NEXT_PUBLIC_BASE_URL="your_next_public_base_url_here"
OPEN_AI_API_KEY="your_openai_api_key_here"
ANTHROPIC_API_KEY="your_anthropic_api_key_here"
```
Replace the placeholders for the keys with your own respective API keys.

### Step 2: Install Dependencies
Ensure you have Node.js installed, then install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Run the Development Server
Start the server using:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open your browser and navigate to either the `AUTH0_BASE_URL` you set or the default [http://localhost:port](http://localhost:port) with your browser to see the result.

