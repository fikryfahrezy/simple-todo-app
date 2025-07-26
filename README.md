# nodewave-front-end

Working web: https://nw-fe-test.vercel.app

## Start Development

### Install Dependencies

```bash
pnpm run install
```

### Setup Env

```bash
cp .env.example .env
```

Update the environment variable with the actual value.

- `NEXT_PUBLIC_NODEWAVE_SERVICE_API_URL` is the URL of the Nodewave service used by the web
- `NEXT_PUBLIC_NODEWAVE_EMAIL_DOMAIN` is the email domain used for the new user in the registration form; the example value is **@domain.com**

### Run development

```bash
pnpm run dev # by default will run on the port 3000
```

## Project Structure

```bash
src/            # the main directory for the code of the application
|_ actions/     # the place for React Server Functions or Action
|_ app/         # the Next.js default app directory
|_ components/  # the global components that are potentially used on many pages
|_ contexts/    # the context of the application that is potentially used for global context
|_ hooks/       # the custom hooks function that is potentially used on many pages or components
|_ lib/         # helper or utility functions
|_ providers/   # the provider used on the application that is potentially used as a global provider
|_ queries/     # where all React Query for calling server resource
|_ services/    # the contract for any external resource
```

## Deployment

The deployment is done manually by running `vercel --prod` using [Vecel CLI](https://vercel.com/docs/cli).
