#!/bin/bash

cd "$(dirname "$0")/.."

# Define paths for migrations and seeds
migrations_parent="database/migrations"
seeds_parent="database/seeds"

auth_server_migrations_child="backend/auth-server/database/migrations"
auth_server_seeds_child="backend/auth-server/database/seeds"

graphql_server_migrations_child="backend/graphql-server/database/migrations"
graphql_server_seeds_child="backend/graphql-server/database/seeds"

# Create migrations and seeds folder if it doesn't exist in auth-server
mkdir -p "$auth_server_migrations_child"
mkdir -p "$auth_server_seeds_child"

# Create migrations and seeds folder if it doesn't exist in graphql-server
mkdir -p "$graphql_server_migrations_child"
mkdir -p "$graphql_server_seeds_child"

# Copy migration and seed files from parent folder to migrations and seed child folder of auth-server
cp -r "$migrations_parent"/* "$auth_server_migrations_child"
cp -r "$seeds_parent"/* "$auth_server_seeds_child"

# Copy migration and seed files from parent folder to migrations and seed child folder of graphql-server
cp -r "$migrations_parent"/* "$graphql_server_migrations_child"
cp -r "$seeds_parent"/* "$graphql_server_seeds_child"

echo "Migrations and seeds copied successfully."
