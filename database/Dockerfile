FROM postgres:16-alpine

# Bake the init SQL into the image so no volume mount is needed at deploy time
COPY database.sql /docker-entrypoint-initdb.d/init.sql
