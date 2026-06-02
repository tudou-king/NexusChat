#!/bin/bash
# NexusChat - Quick Deploy Script
# Usage: ./deploy.sh [port]

PORT=${1:-8080}

echo "========================================="
echo "  NexusChat - Deploy to your server"
echo "========================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Starting NexusChat on port $PORT..."
    echo "Open http://localhost:$PORT in your browser"
    echo ""
    echo "Press Ctrl+C to stop"
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "Starting NexusChat on port $PORT..."
    echo "Open http://localhost:$PORT in your browser"
    echo ""
    echo "Press Ctrl+C to stop"
    python -m SimpleHTTPServer $PORT
else
    echo "Error: Python not found"
    echo ""
    echo "Alternative options:"
    echo "  1. Use Node.js: npx serve . -p $PORT"
    echo "  2. Use PHP: php -S localhost:$PORT"
    echo "  3. Open index.html directly in your browser"
    exit 1
fi
