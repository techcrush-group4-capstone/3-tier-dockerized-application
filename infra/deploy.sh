#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Default values
SSH_USER="azureuser"
SSH_KEY_PATH="~/.ssh/id_rsa"
APP_DIR="~/formflow-app"

# Check if IP address is provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <VM_PUBLIC_IP> [SSH_USER] [SSH_KEY_PATH]"
  echo "Example: ./deploy.sh 198.51.100.12 azureuser ~/.ssh/id_rsa"
  exit 1
fi

PUBLIC_IP=$1
SSH_USER=${2:-$SSH_USER}
SSH_KEY_PATH=${3:-$SSH_KEY_PATH}
SSH_CMD="ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no $SSH_USER@$PUBLIC_IP"

echo "=========================================="
echo " Deploying FormFlow to $PUBLIC_IP"
echo "=========================================="

# Step 1: Create the app directory on the VM
echo "[1/4] Creating application directory on VM..."
$SSH_CMD "mkdir -p $APP_DIR"

# Step 2: Copy the entire project to the VM (excluding unnecessary files)
echo "[2/4] Copying project files to VM..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'infra' \
  --exclude '*.md' \
  -e "ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no" \
  "$(dirname "$(dirname "$(realpath "$0")")")/" "$SSH_USER@$PUBLIC_IP:$APP_DIR/"

# Step 3: Copy the .env file (must exist in the project root)
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
if [ ! -f "$PROJECT_ROOT/.env" ]; then
  echo "ERROR: No .env file found at $PROJECT_ROOT/.env"
  echo "Create one from .env.example and fill in your values."
  exit 1
fi
echo "[3/4] .env file will be synced with the project files."

# Step 4: SSH into the VM and run docker compose
echo "[4/4] Building and starting containers on the VM..."
$SSH_CMD "cd $APP_DIR && sudo docker compose up -d --build"

echo ""
echo "============================================================"
echo " ✅ Deployment Complete!"
echo "============================================================"
echo " Application: http://$PUBLIC_IP"
echo ""
echo " Useful commands (run from your machine):"
echo "   View logs:   $SSH_CMD 'cd $APP_DIR && sudo docker compose logs -f'"
echo "   Stop app:    $SSH_CMD 'cd $APP_DIR && sudo docker compose down'"
echo "   Restart:     $SSH_CMD 'cd $APP_DIR && sudo docker compose restart'"
echo "============================================================"
