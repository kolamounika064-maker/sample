#!/bin/bash
echo "========== VALIDATE DEPLOYMENT =========="
echo "Checking if Apache is running and serving content..."
curl -f http://localhost || exit 1
