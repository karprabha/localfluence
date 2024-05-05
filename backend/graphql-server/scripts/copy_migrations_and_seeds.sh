#!/bin/bash

cd "$(dirname "$0")/.."

# Define paths for migrations and seeds
migrations_parent="../../database/migrations"
seeds_parent="../../database/seeds"

migrations_child="./database/migrations"
seeds_child="./database/seeds"

# Create migrations folder if it doesn't exist
mkdir -p "$migrations_child"

# Create seeds folder if it doesn't exist
mkdir -p "$seeds_child"

# Copy migration files from parent folder to migrations child folder
cp -r "$migrations_parent"/* "$migrations_child"

# Copy seed files from seeds parent folder to migrations child folder
cp -r "$seeds_parent"/* "$seeds_child"

echo "Migrations and seeds copied successfully."
