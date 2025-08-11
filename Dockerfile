FROM node:22.17.1-bookworm AS base

RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm --activate

ARG NEXT_PUBLIC_SERVICE_API_URL=string
ENV NEXT_PUBLIC_SERVICE_API_URL=$NEXT_PUBLIC_SERVICE_API_URL
ARG NEXT_PUBLIC_EMAIL_DOMAIN=string
ENV NEXT_PUBLIC_EMAIL_DOMAIN=$NEXT_PUBLIC_EMAIL_DOMAIN

FROM base AS installer
WORKDIR /app
 
COPY package*json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN npm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=installer --chown=nextjs:nodejs /app/public ./public

ARG PORT=3000
EXPOSE ${PORT}
ENV HOSTNAME=0.0.0.0

USER nextjs

CMD ["node", "server.js"]