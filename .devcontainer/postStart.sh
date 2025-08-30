#!/bin/bash

# Development container post-start script
echo "🚀 Setting up Decrypt The Girl development environment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Setting up environment variables..."
    cp .env.example .env
fi

# Start database if not running
if ! docker ps | grep -q decrypt-the-girl-db; then
    echo "🗄️ Starting PostgreSQL database..."
    docker-compose up -d postgres
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 10
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📊 Setting up database schema..."
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Development environment ready!"
echo "🌐 Run 'npm run dev' to start the development server"
echo "📊 Run 'npm run db:studio' to view the database"