FROM node:20-alpine
WORKDIR /app

# npm ci is reproducible (uses package-lock.json exactly); needs it copied first
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 4000

# node:alpine images ship a built-in unprivileged "node" user - run as that,
# not root, in production containers
USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "src/server.js"]
