# ---- Stage 1: build the static React app ----
FROM node:18-alpine AS build
WORKDIR /app

# Install deps first so this layer is cached unless package*.json changes
COPY package*.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .

# react-scripts 3.4.1 (Webpack 4) is not compatible with the OpenSSL 3
# provider in Node 17+. --openssl-legacy-provider restores the old
# behavior so `npm run build` doesn't fail with:
#   error:0308010C:digital envelope routines::unsupported
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# ---- Stage 2: serve the build with nginx ----
FROM nginx:1.27-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
