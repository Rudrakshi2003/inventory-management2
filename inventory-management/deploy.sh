#!/bin/bash

# 🚀 Quick Deploy Script for Inventory Management App
# This script helps you deploy to Vercel quickly

echo "🚀 Inventory Management App - Quick Deploy Script"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the inventory-management directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Check if we have any commits
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "📝 Making initial commit..."
    git add .
    git commit -m "Initial commit - Inventory Management App"
else
    echo "💾 Adding and committing changes..."
    git add .
    git commit -m "Update app for deployment - $(date)"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo ""
    echo "🌐 GitHub Setup Required:"
    echo "1. Go to https://github.com"
    echo "2. Create a new repository named 'inventory-management'"
    echo "3. Make it PUBLIC (required for free hosting)"
    echo "4. Don't initialize with README"
    echo ""
    read -p "Enter your GitHub username: " github_username
    
    if [ -z "$github_username" ]; then
        echo "❌ GitHub username required. Exiting."
        exit 1
    fi
    
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/$github_username/inventory-management.git
    git branch -M main
else
    echo "🔗 GitHub remote already configured"
    git branch -M main
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push -u origin main; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub. Please check your credentials and repository settings."
    exit 1
fi

echo ""
echo "🎉 SUCCESS! Your code is now on GitHub!"
echo ""
echo "🚀 Next Steps for Vercel Deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign up with GitHub"
echo "3. Click 'Import Project'"
echo "4. Select your 'inventory-management' repository"
echo "5. Click 'Deploy'"
echo ""
echo "⏱️  Your app will be live in 2-3 minutes!"
echo "📱 You'll get a URL like: https://inventory-management-abc123.vercel.app"
echo ""
echo "🔧 Admin Login for your deployed app:"
echo "   Email: adimn-sanumishra01234@gmail.com"
echo "   Password: Mishra@123"
echo ""
echo "Happy hosting! 🎉"