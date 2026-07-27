#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# ==========================================
# Configuration Variables
# ==========================================
RG_NAME="FormFlow-RG"
LOCATION="eastus"
VM_NAME="formflow-prod-vm"
ADMIN_USER="azureuser"
IMAGE="Canonical:0001-com-ubuntu-server-jammy:22_04-lts-gen2:latest"  # Ubuntu Server 22.04 LTS Gen2 (free)
SIZE="Standard_D2s_v3"

echo "=========================================="
echo " Starting FormFlow Azure VM Provisioning "
echo "=========================================="

# 1. Create Resource Group
echo "[1/4] Creating Resource Group: $RG_NAME in $LOCATION..."
az group create --name "$RG_NAME" --location "$LOCATION" -o table

# 2. Create the Virtual Machine
# --generate-ssh-keys will create ~/.ssh/id_rsa if it doesn't exist, or use the existing one.
# --custom-data passes the cloud-init script to install Docker automatically.
echo "[2/4] Creating Virtual Machine: $VM_NAME (This may take a few minutes)..."
az vm create \
  --resource-group "$RG_NAME" \
  --name "$VM_NAME" \
  --image "$IMAGE" \
  --size "$SIZE" \
  --zone 3 \
  --admin-username "$ADMIN_USER" \
  --generate-ssh-keys \
  --custom-data cloud-init.yaml \
  --public-ip-sku Standard \
  -o table

# 3. Open Ports
echo "[3/4] Opening Port 80 (HTTP) for frontend traffic..."
az vm open-port --resource-group "$RG_NAME" --name "$VM_NAME" --port 80 --priority 1001 -o none

echo "[4/4] Opening Port 22 (SSH) for GitHub Actions deployment..."
az vm open-port --resource-group "$RG_NAME" --name "$VM_NAME" --port 22 --priority 1002 -o none

# 4. Fetch the Public IP
PUBLIC_IP=$(az vm show -d -g "$RG_NAME" -n "$VM_NAME" --query publicIps -o tsv)

echo ""
echo "============================================================"
echo " ✅ Provisioning Complete! "
echo "============================================================"
echo " VM Name:    $VM_NAME"
echo " Public IP:  $PUBLIC_IP"
echo " Admin User: $ADMIN_USER"
echo "============================================================"
echo ""
echo "Next Steps for your CI/CD Pipeline:"
echo "1. Wait ~2 minutes for cloud-init to finish installing Docker in the background."
echo "2. Test your SSH connection:"
echo "   ssh $ADMIN_USER@$PUBLIC_IP"
echo "3. Add the following to your GitHub Secrets:"
echo "   - VM_HOST:        $PUBLIC_IP"
echo "   - DEPLOY_USER:    $ADMIN_USER"
echo "   - DEPLOY_SSH_KEY: (Copy the contents of your private key, usually ~/.ssh/id_rsa)"
echo "============================================================"
