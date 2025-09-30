#!/bin/bash

# =============================
# Simple Warehouse Setup Script
# Compatible with Windows Git Bash
# =============================

set -e  # exit on error

echo "✅ Step 1: Build Docker containers..."
docker-compose -f docker-compose.prod.yml build

echo "✅ Step 2: Install npm dependencies in frontend container..."
docker-compose -f docker-compose.prod.yml run --rm frontend npm install --legacy-peer-deps

echo "✅ Step 3: Build frontend..."
docker-compose -f docker-compose.prod.yml run --rm frontend npm run build

echo "✅ Step 4: Collect static files in web container..."
docker-compose -f docker-compose.prod.yml run --rm web python manage.py collectstatic --noinput

echo "✅ Step 5: Apply migrations..."
docker-compose -f docker-compose.prod.yml run --rm web python manage.py migrate

echo "✅ Step 7: Start all containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "🎉 Setup completed! Access the app at http://localhost"
